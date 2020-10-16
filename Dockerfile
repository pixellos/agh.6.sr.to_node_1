FROM 14.13.1-alpine3.10
WORKDIR /usr/src/app
COPY *.json ./
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000
CMD npm start