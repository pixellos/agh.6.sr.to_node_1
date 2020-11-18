// src/server.ts
import * as app from "./app";
import { config } from 'dotenv'
config();

const port = process.env.PORT || 3001;

app.app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);