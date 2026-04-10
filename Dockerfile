FROM node:22-alpine

WORKDIR /adim-dash-template

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]