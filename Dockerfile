FROM node:14-alpine3.10 as builder
WORKDIR /usr/src/app

ARG MS_NAME

COPY ./${MS_NAME}/src/. ./${MS_NAME}/src/
COPY ./${MS_NAME}/*json ./${MS_NAME}/.

COPY ./commons-microservice/ ./commons-microservice/

WORKDIR /usr/src/app/${MS_NAME}

RUN npm install
RUN npm run build

FROM node:14-alpine3.10
ARG MS_NAME

WORKDIR /root/
COPY --from=builder /usr/src/app/${MS_NAME}/dist .

EXPOSE 3000
CMD node index.js
