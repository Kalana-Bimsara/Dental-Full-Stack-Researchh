# FROM node:22-alpine
FROM node:20-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9000
EXPOSE 8080

CMD ["npm", "start"]
