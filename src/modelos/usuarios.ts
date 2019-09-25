// import * as Sequelize from 'sequelize';
import db from './db';
import { from, Observable } from 'rxjs';
import { usuariosModel, usuariosInstance } from '../models/db';
class InterfazUsuarios {
  Users: usuariosModel;
  constructor(){
    this.Users = db.import('../models/usuarios');
  }
  static init(): InterfazUsuarios {
    return new InterfazUsuarios();
  }
  updateById (id: number, nombre: string, onSuccess?: any, onError?: any) {
    this.Users.update({ nombre: nombre},{where: {id: id} }).
      then(() => {
        console.log('nombre actualizado');
      }).
      error(() => {
        console.log('error al actualizar el nombre de usuario');
      });
  };
  insertarUno(nombre: string, pass: string): Observable<number> {
    return new Observable(observer => {
      // revisar: id null
      this.Users.create({ id: null, nombre: nombre, password: pass })
      // revisar: x es una instancia?
      .then((x: usuariosInstance ) => {
        observer.next(x.id);
      })
    });
  }
  getAll() {
    return from(this.Users.findAll({}));
  }
  getByName(nombre: string): Observable<usuariosInstance> {
    return new Observable ( observador => {
      this.Users.findOne({where: {nombre: nombre}})
        .then(user => {
          observador.next(user);
        });
    })
  }
  borrarTodos(onSuccess?: any, onError?: any): any {
    this.Users.destroy({where: {}})
    .then(onSuccess)
    .catch(onError);
  };
  retrieveById(id: number, onSuccess: any, onError: any) {
    this.Users.findOne({where: {id: id}})
      .then(onSuccess).error(onError);
  }
  borrarporId(id: number): Observable<boolean> {
    return new Observable<boolean>(ob => {
      this.Users.findOne({where: {id: id}})
      .then((resultado: usuariosInstance) => {
        this.Users.destroy({where: {id: id} })
          .then(() => {
            console.log('usuario borrado de la base de datos');
            ob.next(true);
          }).
          error(() => {
            console.log('error al borrar al usuario de la bd');
            ob.next(false);
          });
      })
    })
  }
}
const modelo= InterfazUsuarios.init();
export default modelo;
