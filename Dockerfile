FROM node:17-alpine

WORKDIR /app

COPY . .

RUN yarn

EXPOSE 4000

CMD [ "yarn", "dev" ]
