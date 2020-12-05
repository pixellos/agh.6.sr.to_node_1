FROM node:14-alpine3.10 as builder
WORKDIR /usr/src/app

ARG MS_NAME

COPY ./${MS_NAME}/src/. ./${MS_NAME}/src/
COPY ./${MS_NAME}/*json ./${MS_NAME}/

COPY ./commons-microservice/ ./commons-microservice/

WORKDIR /usr/src/app/commons-microservice
RUN npm install
RUN npm run build

WORKDIR /usr/src/app/${MS_NAME}

RUN npm install
RUN npm run build

FROM node:14-alpine3.10
ARG MS_NAME

WORKDIR /root/
COPY --from=builder /usr/src/app/${MS_NAME}/dist app/dist
COPY --from=builder /usr/src/app/commons-microservice/node_modules app/dist/node_modules
COPY --from=builder /usr/src/app/${MS_NAME}/node_modules app/dist/node_modules
COPY --from=builder /usr/src/app/commons-microservice/lib commons-microservice/src
COPY --from=builder /usr/src/app/commons-microservice/node_modules commons-microservice/src/node_modules
WORKDIR /root/app/dist

EXPOSE 3000
CMD node server.js
