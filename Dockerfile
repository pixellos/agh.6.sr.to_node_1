FROM node:14-alpine3.10 as commonbuilder
WORKDIR /usr/src/app/commons-microservice
COPY ./commons-microservice ./

RUN npm install
RUN npm run build

FROM node:14-alpine3.10 as builder
ARG MS_NAME
WORKDIR /usr/src/app/${MS_NAME}

COPY ./${MS_NAME} /usr/src/app/${MS_NAME}
COPY --from=commonbuilder /usr/src/app/commons-microservice /usr/src/app/commons-microservice

RUN npm install
RUN npm run build

FROM node:14-alpine3.10 as runner
ARG MS_NAME

ENV PRODUCT_CUSIP="http://host.docker.internal:3002/"
ENV ORDER_CUSIP="http://host.docker.internal:3001/"
ENV FRONT_CUSIP="http://host.docker.internal:3003/"
ENV MONGO_DB="mongodb://host.docker.internal:27017"
ENV PORT=3000

WORKDIR /root/
COPY --from=commonbuilder /usr/src/app/commons-microservice commons-microservice
COPY --from=builder /usr/src/app/${MS_NAME}/dist app/dist
COPY --from=builder /usr/src/app/${MS_NAME}/config app/dist/config
COPY --from=builder /usr/src/app/${MS_NAME}/node_modules app/dist/node_modules
WORKDIR /root/app/dist

EXPOSE 3000
CMD node server.js
