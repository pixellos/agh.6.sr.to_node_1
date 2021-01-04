FROM node:14-alpine3.10 as commonbuilder
WORKDIR /usr/src/app/commons-microservice
COPY ./commons-microservice .

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

ENV PRODUCT_MICROSERVICE_SERVICE_SERVICE_HOST="host.docker.internal"
ENV ORDER_MICROSERVICE_SERVICE_SERVICE_HOST="host.docker.internal"
ENV FRONTEND_MICROSERVICE_SERVICE_SERVICE_HOST="host.docker.internal"
ENV FRONTEND_MICROSERVICE_SERVICE_SERVICE_PORT="3003"
ENV MONGO_DB="mongodb://host.docker.internal:27017"
ENV APPINSIGHTS_INSTRUMENTATIONKEY="bd32180d-56b4-4473-b277-4c59e80f2d80"

ENV PORT=3000

WORKDIR /root/
COPY --from=commonbuilder /usr/src/app/commons-microservice/lib /root/commons-microservice/src
COPY --from=commonbuilder /usr/src/app/commons-microservice/node_modules app/dist/node_modules
COPY --from=commonbuilder /usr/src/app/commons-microservice/node_modules /root/commons-microservice/node_modules
COPY --from=builder /usr/src/app/${MS_NAME}/dist app/dist
COPY --from=builder /usr/src/app/${MS_NAME}/config app/dist/config
COPY --from=builder /usr/src/app/${MS_NAME}/node_modules app/dist/node_modules
WORKDIR /root/app/dist

EXPOSE ${PORT}
CMD node server.js
