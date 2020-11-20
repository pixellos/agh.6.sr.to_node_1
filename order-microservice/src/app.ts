// src/app.ts
import express, { Response as ExResponse, Request as ExRequest } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import {RegisterRoutes} from './generated/routes';
import * as swagger from './generated/swagger.json';
import cors from 'cors'

export const app = express();
app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger, ({ explorer: true })));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

RegisterRoutes(app);