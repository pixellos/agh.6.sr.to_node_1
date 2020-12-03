// src/app.ts
import express, { Response as ExResponse, Request as ExRequest } from "express";
import { SetupBase } from "../../commons-microservice/src/app-common";

export const app = express();

SetupBase(app, {});