FROM node:18.17.0-alpine3.18

WORKDIR /app

COPY ["package.json", "./"]

COPY .  /app

RUN npm install

ENV PORT=3000
ENV POSTGRES_URL=postgres://default:H1jp5KRkXDMe@ep-twilight-recipe-a27ok8ra-pooler.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require

EXPOSE 3000

ENTRYPOINT [ "sh", "-c", "npm run start" ]


