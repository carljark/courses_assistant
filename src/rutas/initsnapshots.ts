// var express = require('express');
import { Request, Response, Router } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import Snapshot from '../clasesnapshot';
import config from '../environment';
import modeloportada from '../modelos/lessons-model';
class PostRouter {
  public static camelize(str: string): string {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
        // return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
        return letter.toUpperCase();
      })
      .replace(/\s+/g, '');
  }
  public router: Router;
  public publicKey: Buffer;
  constructor() {
    this.router = Router();
    this.routes();
  }
  public rutaInicial(req: Request, res: Response): void {
    let idcurso = 0;
    idcurso = parseInt(res.locals.decoded.sub, 10);
    fs.readdir(
      path.join(__dirname, '../', config.dirPublicName) +
        '/' +
        idcurso +
        '/snapshots',
      (error, files) => {
        if (error) {
          throw error;
        }
        const imagenes: Snapshot[] = [];
        let id = 0;
        const archivo = '';
        const serie = '';
        const modelo = '';
        const status = false;
        files.forEach((file) => {
          id += 1;
          const nombremostrado = PostRouter.camelize(file.slice(0, -4));
          imagenes.push({
            archivo: file,
            editsino: status,
            id,
            idcurso,
            nombremostrado,
            serie,
          });
        });
        modeloportada.build();
        modeloportada.borrarTodos(idcurso);
        modeloportada
          .insertarMatriz(imagenes, idcurso)
          .subscribe((imgssalvadas: Snapshot[]) => {
            res.json(imgssalvadas);
          });
      }
    );
  }
  private routes() {
    this.router.post('/', this.rutaInicial);
  }
}
const rutainitportada = new PostRouter().router;
export default rutainitportada;
