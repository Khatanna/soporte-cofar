FROM node:14-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install && \
    npm install @angular/cli@11.2.5 -g

COPY . .

EXPOSE 4200

CMD ng serve --host
