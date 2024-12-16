FROM node:20.6.0-alpine

WORKDIR /usr/

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["sh", "-c", "npm run db:migrate && npx ts-node ./node_modules/sequelize-cli/lib/sequelize db:seed:all && npm run pm2:start"]
