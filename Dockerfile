FROM node:16

WORKDIR /usr/app/teste-bexup

COPY ./package.json ./

RUN yarn

COPY ./dist ./dist

EXPOSE 3333

CMD yarn start
