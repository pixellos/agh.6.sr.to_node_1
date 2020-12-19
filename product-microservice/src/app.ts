// src/app.ts
import express, { Response as ExResponse, Request as ExRequest } from "express";
import { RegisterRoutes } from './generated/routes';
import { SetupBase } from "../../commons-microservice/src/app-common";
import * as swagger from './generated/swagger.json';

export const app = express();

SetupBase(app, swagger);
RegisterRoutes(app);