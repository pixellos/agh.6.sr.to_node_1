// src/app.ts
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import * as core from "express-serve-static-core";
import cors from 'cors'
import jwt from "express-jwt";
import { expressJwtSecret } from 'jwks-rsa';
import * as ai from 'applicationinsights';

export function SetupBase(app: core.Express, swagger: {}) {
  ai.setup()
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true, true)
    .setUseDiskRetryCaching(true)
    .setSendLiveMetrics(true)
    .setDistributedTracingMode(ai.DistributedTracingModes.AI)
    .start();
  
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
    algorithms: ['RS256']
  }).unless({ custom: x => x.path.indexOf('api-docs') !== -1}));

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger, ({ explorer: true })));

  app.use((req, res, next) => {
    let current_datetime = new Date();
    let formatted_date =
      current_datetime.getFullYear() +
      "-" +
      (current_datetime.getMonth() + 1) +
      "-" +
      current_datetime.getDate() +
      " " +
      current_datetime.getHours() +
      ":" +
      current_datetime.getMinutes() +
      ":" +
      current_datetime.getSeconds();
    let method = req.method;
    let url = req.url;
    let status = res.statusCode;
    let log = `[${formatted_date}] ${method}:${url} ${status}`;
    console.log(log);
    next();
  });

  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());
}