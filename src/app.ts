// src/app.ts
import express, { Response as ExResponse, Request as ExRequest } from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "../tsoa/routes";
import swaggerUi from "swagger-ui-express";

export const app = express();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(import("../tsoa/swagger.json"), ({ explorer: true })));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

RegisterRoutes(app);