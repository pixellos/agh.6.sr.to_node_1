FROM node:14-alpine3.10 as builder
WORKDIR /usr/src/app

ARG MS_NAME

#dependencies - for caching:
COPY ./${MS_NAME}/package.json ./${MS_NAME}/package.json
COPY ./commons-microservice/package.json ./commons-microservice/package.json

WORKDIR /usr/src/app/commons-microservice
RUN npm install

WORKDIR /usr/src/app/${MS_NAME}
RUN npm install

#build:
WORKDIR /usr/src/app

COPY ./${MS_NAME}/src/. ./${MS_NAME}/src/
COPY ./${MS_NAME}/*json ./${MS_NAME}/

COPY ./commons-microservice/ ./commons-microservice/

WORKDIR /usr/src/app/commons-microservice
RUN npm run build

WORKDIR /usr/src/app/${MS_NAME}
RUN npm run build

#run:
FROM node:14-alpine3.10
ARG MS_NAME

#env settings for local run - adjust / remove before deployment:
ENV MONGO_DB="mongodb://host.docker.internal:27017"
ENV PORT=3000

WORKDIR /root/
COPY --from=builder /usr/src/app/${MS_NAME}/dist app/dist
COPY --from=builder /usr/src/app/commons-microservice/node_modules app/dist/node_modules
COPY --from=builder /usr/src/app/${MS_NAME}/node_modules app/dist/node_modules
COPY --from=builder /usr/src/app/commons-microservice/lib commons-microservice/src
COPY --from=builder /usr/src/app/commons-microservice/node_modules commons-microservice/src/node_modules
WORKDIR /root/app/dist

EXPOSE 3000
CMD node server.js
