// src/app.ts
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import * as core from "express-serve-static-core";
import cors from 'cors'
import jwt from "express-jwt";
import { expressJwtSecret } from 'jwks-rsa';

export function SetupBase(app: core.Express, swagger: {}) {
  app.use(cors())

  const secret = expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-mattp.eu.auth0.com/.well-known/jwks.json',
  })

  app.use(jwt({
    audience: 'https://dev-mattp.eu.auth0.com/api/v2/',
    issuer: 'https://dev-mattp.eu.auth0.com/',
    secret: secret,
    algorithms: ['RS256'],
  }).unless({  custom: x =>  x.path.indexOf('api-docs') !== -1}));

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger, ({ explorer: true })));

  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());
}