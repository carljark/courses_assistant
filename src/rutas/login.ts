// var express = require('express');
import { Request, Response, Router } from 'express';
import * as fs from 'fs';

import Cursos from '../modelos/cursos';
import InterfazInscrip from '../modelos/inscripciones';
import users from '../modelos/usuarios';

import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import IdCursoNombre from '../clase.idcursonombre';
import { cursosInstance } from '../models/db';

class RouterLogin {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  public rutaprincipal(req: Request, res: Response): void {
    users.getByName(req.body.username)
      .subscribe((user) => {
        if (user) {

          if (user.password === req.body.password) {
            // comprobar la fecha de la suscripcion (inscripción)
            // obtener la lista de cursos a los que el usuario está
            // registrado a través del modelo inscripciones
            // y meterlo en la 'audience' por ejemplo
            InterfazInscrip.conseguirPorIdusuario(user.id)
              .subscribe((usucursos) => {
                // console.log('usucursos: ', usucursos);
                let listacursos = '';
                let cursosbd: cursosInstance[];
                let idcurso: string;
                const tam = usucursos.length;
                const idscursosnombres: IdCursoNombre[] = new Array(tam);
                Cursos.conseguirTodas()
                  .subscribe((cursos) => {
                    cursosbd = cursos;
                    usucursos.forEach((elto, indice, matriz) => {
                      // console.log('elto de usucursos', elto);
                      idcurso = elto.idcurso.toString();
                      if (indice < tam - 1) {
                        listacursos = listacursos.concat(idcurso, ',');
                      } else {
                        listacursos = listacursos.concat(idcurso);
                      }
                      idscursosnombres[indice] = {
                          idcurso: elto.idcurso,
                          nombrecurso: cursosbd.filter((curso) => curso.id === elto.idcurso)[0].nombrecurso,
                        };
                    });
                    // console.log('lista de cursos del usuario: ', listacursos);
                    // console.log('idscursosnombres: ', idscursosnombres);
                    const signOptions: SignOptions = {
                      algorithm: 'RS256',
                      audience: listacursos,
                      expiresIn: '2h',
                      issuer: 'Authorization/Este servidor',
                      subject: user.id.toString(),
                    };
                    const userObjeto = {
                      nombre: user.nombre,
                      password: user.password,
                    };
                    const privateKey = fs.readFileSync(__dirname + '/private.key');
                    const tokenJark = jwt.sign(userObjeto, privateKey, signOptions);
                    res.json({
                      idscursosnombres,
                      token: tokenJark,
                      userid: user.id,
                    });
                  });
              });
          } else {
            res.json('el password no es correcto para este usuario');
            console.log('el password no es correcto para este usuario');
          }
        } else {
          console.log('no existe el usuario');
          res.send(null);
        }
      });
  }
  private routes() {
    this.router.post('/', this.rutaprincipal);
  }
}
const ruta = new RouterLogin().router;
export default ruta;
