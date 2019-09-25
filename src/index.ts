import express from 'express';
import http from 'http';
import Server from './server/server';

import rutaCheckIp from './rutas/checkip';

import config, { mode } from './environment';

if (mode === 'production') {
  const apphttp = express();
  apphttp.use(rutaCheckIp);
  const serverhttp = http.createServer(apphttp);
  const httpPort = 8080;
  serverhttp.listen(httpPort, () => {
      console.log(`http escuchando en ${httpPort}`);
  });
}

const port = config.port;
const server = Server.init(port, mode);
server.start(() => {
  console.log(`servidor escuchando en modo ${mode} en el puerto ${port}`);
});
