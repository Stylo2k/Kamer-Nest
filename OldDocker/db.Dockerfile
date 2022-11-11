FROM postgres:13

EXPOSE 5432

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=123
ENV POSTGRES_DB=users
ENV DATABASE_URL=postgresql://postgres:123@localhost:5432/users?schema=public

WORKDIR /prisma

COPY ./prisma .

COPY package*.json ./

RUN apt update && apt install -y curl

RUN curl -sL https://deb.nodesource.com/setup_18.x -o /tmp/nodesource_setup.sh

RUN bash /tmp/nodesource_setup.sh

RUN apt update && apt install -y nodejs

RUN npm install -g prisma

RUN prisma migrate dev
