import { Observable } from 'rxjs';
import {
  IexercisesInstance,
  IexercisesModel,
} from '../models-factory/db';
import db from './db';
class Interfazejercicios {
  public static init(): Interfazejercicios {
    return new Interfazejercicios();
  }
  public EjerModel: IexercisesModel;
  constructor() {
    this.EjerModel = db.import('../models-factory/exercises-factory');
  }

  public insertarUno(idsnapshot: number, archivo: string): Observable<number> {
    return new Observable((observer) => {
      this.EjerModel.create({ id: null, idlesson: idsnapshot, archivo })
      .then((x) => {
        observer.next(x.id);
      });
    });
  }
  public conseguirTodas(onSuccess?: any, onError?: any): any {
    this.EjerModel.findAll({})
    .then(onSuccess)
    .catch(onError);
  }
  public buscarporIdsnapshot(idsnapshot: number): Observable<IexercisesInstance[]> {
    return new Observable((observer) => {
      this.EjerModel.findAll({ where: {idlesson: idsnapshot} })
      .then((ejercicios) => {
        observer.next(ejercicios);
      });
    });
  }
  public borrarTodos(onSuccess?: any, onError?: any): any {
    this.EjerModel.destroy({where: {}})
    .then(onSuccess)
    .catch(onError);
  }
  public retrieveById(id: number, onSuccess: any, onError: any) {
    this.EjerModel.findOne({where: {id}})
      .then(onSuccess).error(onError);
  }
  public borrarporId(id: number) {
      this.EjerModel.findOne({where: {id}})
      .then((resultado: IexercisesInstance) => {
        this.EjerModel.destroy({where: {id} })
          .then(() => {
            console.log('ejercicio borrado de la base de datos');
          }).
          error(() => {
            console.log('error al borrar el ejercicio de la bd');
          });
    });
  }
}
const modelo = Interfazejercicios.init();
export default modelo;
