FROM node:16-alpine

WORKDIR /app 

COPY package*.json ./

RUN npm install

COPY . .

WORKDIR /app/db 

RUN npx prisma generate

WORKDIR /app

RUN npm run build

EXPOSE 3000

CMD [ "npm" , "start" ]