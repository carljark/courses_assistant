// import * as Sequelize from 'sequelize';
import db from './db';
import { Observable } from 'rxjs';
import { IexercisesModel, IexercisesInstance } from '../models/db';
class Interfazejercicios {
  EjerModel: IexercisesModel;
  constructor(){
    this.EjerModel = db.import('../models/ejercicios');
  }
  static init(): Interfazejercicios {
    return new Interfazejercicios();
  }
  insertarUno(idsnapshot: number, archivo: string): Observable<number> {
    return new Observable(observer => {
      this.EjerModel.create({ id: null, idlesson: idsnapshot, archivo: archivo })
      .then((x) => {
        observer.next(x.id);
      })
    });
  }
  conseguirTodas(onSuccess?: any, onError?: any): any {
    this.EjerModel.findAll({})
    .then(onSuccess)
    .catch(onError);
  }
  buscarporIdsnapshot(idsnapshot: number): Observable<IexercisesInstance[]> {
    return new Observable(observer => {
      this.EjerModel.findAll({ where: {idlesson: idsnapshot} })
      .then(ejercicios => {
        observer.next(ejercicios);
      });
    });
  }
  borrarTodos(onSuccess?: any, onError?: any): any {
    this.EjerModel.destroy({where: {}})
    .then(onSuccess)
    .catch(onError);
  };
  retrieveById(id: number, onSuccess: any, onError: any) {
    this.EjerModel.findOne({where: {id: id}})
      .then(onSuccess).error(onError);
  }
  borrarporId(id: number){
      this.EjerModel.findOne({where: {id: id}})
      .then((resultado: IexercisesInstance) => {
        this.EjerModel.destroy({where: {id: id} })
          .then(() => {
            console.log('ejercicio borrado de la base de datos');
          }).
          error(() => {
            console.log('error al borrar el ejercicio de la bd');
          });
    })
  }
}
const modelo= Interfazejercicios.init();
export default modelo;
