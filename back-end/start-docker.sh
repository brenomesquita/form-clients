#!/bin/bash

# Aguarda até o PostgreSQL estar acessível
until pg_isready -h 172.16.238.2 -p 5432; do
  echo "Esperando o banco de dados ficar disponível..."
  sleep 2
done


# Verifica se o Docker está instalado
if ! command -v docker &> /dev/null
then
  echo "Docker não encontrado. Por favor, instale o Docker para continuar."
  exit 1
fi

# Nome da imagem Docker
IMAGE_NAME="form-app"
CONTAINER_NAME="form-container"

# Faz o build da imagem Docker
echo "Construindo a imagem Docker..."
docker build -t $IMAGE_NAME .

# Verifica se o contêiner já está rodando e, se estiver, remove-o
echo "Verificando se o contêiner já está rodando..."
docker ps -q -f name=$CONTAINER_NAME
if [ $? -eq 0 ]; then
  echo "Contêiner está rodando, removendo o contêiner existente..."
  docker rm -f $CONTAINER_NAME
fi

# Rodando o contêiner em modo detach
echo "Iniciando o contêiner Docker..."
docker run \
  --name $CONTAINER_NAME \
  -p 3001:3001 \
  --env-file .env \
  $IMAGE_NAME

# Opcional: Você pode adicionar outros comandos para iniciar o contêiner com variáveis de ambiente ou volume
echo "Contêiner $CONTAINER_NAME rodando em segundo plano na porta 3001."

