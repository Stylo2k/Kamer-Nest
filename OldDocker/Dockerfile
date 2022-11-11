FROM node:18

WORKDIR /nest-api

COPY package*.json ./


# copy everything except what is defined in .dockerignore
COPY . .

EXPOSE 3000


RUN npm install


CMD ["npm", "run", "start:dev"]
