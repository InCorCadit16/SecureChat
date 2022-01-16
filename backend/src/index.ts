import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';

dotenv.config();

import './core/db';
import createRoutes from './core/routes';
import createSocket from './core/socket';
console.log(`huiak`);
const app = express();
const http = createServer(app);
const io = createSocket(http);

createRoutes(app, io);
console.log(`homeak`);
const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3003;

http.listen(PORT, function () {
  console.log(`Server: http://localhost:${PORT}`);
});
