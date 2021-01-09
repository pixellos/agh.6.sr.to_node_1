FROM node:current-alpine3.10 as build

WORKDIR /usr/src/app
COPY ./frontend/*.json ./
COPY ./frontend/src/ ./src/

RUN npm install
RUN npm run build
ENV APPINSIGHTS_INSTRUMENTATIONKEY="bd32180d-56b4-4473-b277-4c59e80f2d80"

# Stage - Production
FROM nginx:1.17-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
