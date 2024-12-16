#!/bin/bash

# Função para verificar se o Docker Compose está instalado
check_docker_compose() {
  if ! command -v docker-compose &> /dev/null
  then
    echo "Docker Compose não encontrado, instalando..."
    install_docker_compose
  else
    echo "Docker Compose já está instalado."
  fi
}

# Função para instalar o Docker Compose
install_docker_compose() {
  # Detecta a arquitetura do sistema
  ARCH=$(uname -m)
  if [ "$ARCH" == "x86_64" ]; then
    DOCKER_COMPOSE_VERSION="1.29.2"
    echo "Baixando o Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/download/$DOCKER_COMPOSE_VERSION/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
  else
    echo "A arquitetura do sistema não é compatível ou não foi detectada corretamente."
    exit 1
  fi
}

# Verifica e instala o Docker Compose, se necessário
check_docker_compose

INSTALL=false

# Verifica se o parâmetro --install foi passado
for arg in "$@"; do
  if [ "$arg" == "--install" ]; then
    INSTALL=true
    break
  fi
done

echo "Iniciando o backend..."
cd ./back-end || exit
# Executa npm install se a flag --install estiver habilitada
if [ "$INSTALL" == true ]; then
  echo "Instalando dependências..."
  npm install
fi
docker-compose up -d

echo "Aguardando o backend iniciar..."
sleep 10  # Dá um tempo para o backend iniciar

echo "Iniciando o frontend..."
cd ../front-end || exit
# Executa npm install se a flag --install estiver habilitada
if [ "$INSTALL" == true ]; then
  echo "Instalando dependências..."
  npm install
fi
npm run dev
