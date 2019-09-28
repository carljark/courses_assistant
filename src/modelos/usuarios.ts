import { from, Observable, of } from 'rxjs';
import {catchError} from 'rxjs/operators';
import {
  IUsersInstance,
  IUsersModel,
} from '../models/db';
import db, {DefineDb} from './db';

class InterfazUsuarios {
  public static init(): InterfazUsuarios {
    return new InterfazUsuarios();
  }
  public Users: IUsersModel;
  private emptyUser: IUsersInstance = {id: -1, nombre: '', password: ''} as IUsersInstance;
  constructor() {
    this.Users = db.import('../models/usuarios');
  }
  public updateById(id: number, nombre: string, onSuccess?: any, onError?: any) {
    this.Users.update({ nombre }, { where: {id} }).
      then(() => {
        console.log('nombre actualizado');
      }).
      error(() => {
        console.log('error al actualizar el nombre de usuario');
      });
  }
  public insertarUno(nombre: string, pass: string): Observable<number> {
    return new Observable((observer) => {
      // revisar: id null
      this.Users.create({ id: null, nombre, password: pass })
      // revisar: x es una instancia?
      .then((x: IUsersInstance ) => {
        observer.next(x.id);
      });
    });
  }
  public getAll() {
    return from(this.Users.findAll({}));
  }
  public getByName(nombre: string): Observable<IUsersInstance> {
    /* return new Observable ( (observador) => {
      this.Users.findOne({where: {nombre}})
        .then((user) => {
          observador.next(user);
        });
    }); */
    return from(this.Users.findOne({where: {nombre}}))
    .pipe(
      catchError((err) => {
        if (err.name) {
          console.log('err.name: ', err.name);
        }
        return of(null);
      }),
    );

  }
  public borrarTodos(onSuccess?: any, onError?: any): any {
    this.Users.destroy({where: {}})
    .then(onSuccess)
    .catch(onError);
  }
  public retrieveById(id: number, onSuccess: any, onError: any) {
    this.Users.findOne({where: {id}})
      .then(onSuccess).error(onError);
  }
  public borrarporId(id: number): Observable<boolean> {
    return new Observable<boolean>((ob) => {
      this.Users.findOne({where: {id}})
      .then((resultado: IUsersInstance) => {
        this.Users.destroy({where: {id} })
          .then(() => {
            console.log('usuario borrado de la base de datos');
            ob.next(true);
          }).
          error(() => {
            console.log('error al borrar al usuario de la bd');
            ob.next(false);
          });
      });
    });
  }
}
const modelo = InterfazUsuarios.init();
export default modelo;
