// src/app.ts
import express, { Response as ExResponse, Request as ExRequest } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import {RegisterRoutes} from './generated/routes';
import * as swagger from './generated/swagger.json';

export const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger, ({ explorer: true })));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

RegisterRoutes(app);