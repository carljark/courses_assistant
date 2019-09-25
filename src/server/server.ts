import express from 'express';
import https from 'https';

import {apollo} from './apollo-server';
import {credentials} from './credentials';

import comprobartoken from '../rutas/checktoken';
import indexRouter from '../rutas/index';

export default class Server {
  public static init(port: number, mode: string): Server {
    return new Server(port, mode);
  }

  public hts: https.Server;
  public app: express.Application;

  constructor(private port: number, private mode: string) {
    const ruta = '/graphql';
    this.app = express();
    this.app.use(ruta, comprobartoken);
    apollo.applyMiddleware({app: this.app});
    this.app.use('/', indexRouter); // se chequea el token antes que ir al graphql
  }

  public start(callback?: () => void) {
    if (this.mode === 'development') {
      console.log('http');
      this.app.listen(this.port, callback);
    } else {
      console.log('https');
      this.hts = https.createServer(credentials , this.app);
      this.hts.listen(this.port, callback);
    }
  }

}
