FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production
RUN npm install -g nodemon

COPY . .

EXPOSE ${PORT}

CMD [ "nodemon", "-L", "src/server.ts" ]
