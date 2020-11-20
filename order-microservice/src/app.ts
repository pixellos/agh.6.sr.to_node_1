// src/app.ts
import express, { Response as ExResponse, Request as ExRequest } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from './generated/routes';
import * as swagger from './generated/swagger.json';
import cors from 'cors'
import jwt from "express-jwt";
import jwksRsa from 'jwks-rsa'


export const app = express();
app.use(cors())

const secret = jwksRsa.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: 'https://dev-mattp.eu.auth0.com/.well-known/jwks.json',
})

app.use(jwt({
  audience: 'https://dev-mattp.eu.auth0.com/api/v2/',
  issuer: 'https://dev-mattp.eu.auth0.com/',
  secret: secret, 
  algorithms: ['RS256']
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger, ({ explorer: true })));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

RegisterRoutes(app);