// src/app.ts
import express from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "../tsoa/routes";
import { setup } from 'applicationinsights'
export const app = express();

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

RegisterRoutes(app);

const key = process.env["APP_INSIGHTS_KEY"];

if (key) {
  setup(key).start();
}