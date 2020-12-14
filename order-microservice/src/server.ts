// src/server.ts
import * as app from "./app";
import { config } from 'dotenv'
import { Connection } from "./Connection";
config();

const port = process.env.PORT || 3001;

app.app.listen(port, async () =>
  await Connection.connect()
);