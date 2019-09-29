import { Observable } from 'rxjs';
import {
  InscriptionsInstance,
  InscriptionsModel,
} from '../models-factory/db';
import db from './db';
class InterfazInscripciones {
  public static init(): InterfazInscripciones {
    return new InterfazInscripciones();
  }
  public InscModel: InscriptionsModel;
  constructor() {
    this.InscModel = db.import('../models-factory/inscript-factory');
  }
  public insertarUno(idusuario: number, idcurso: number, caducidad: Date ): Observable<number> {
    return new Observable((observer) => {
      this.InscModel.create({
        caducidad,
        id: null,
        idcurso,
        idusuario,
      })
      .then((x: InscriptionsInstance ) => {
        observer.next(x.id);
      });
    });
  }
  public conseguirTodas(onSuccess?: any, onError?: any): any {
    this.InscModel.findAll({})
    .then(onSuccess)
    .catch(onError);
  }
  public conseguirPorIdusuario(idusuario: number): Observable<InscriptionsInstance[]> {
    return new Observable((observer) => {
      this.InscModel.findAll({ where: {idusuario} })
      .then((cursos) => {
        observer.next(cursos);
      });
    });
  }
  public borrarTodos(onSuccess?: any, onError?: any): any {
    this.InscModel.destroy({where: {}})
    .then(onSuccess)
    .catch(onError);
  }
  public retrieveById(id: number, onSuccess: any, onError: any) {
    this.InscModel.findOne({where: {id}})
      .then(onSuccess).error(onError);
  }
  public borrarporId(id: number) {
      this.InscModel.findOne({where: {id}})
      .then((resultado: InscriptionsInstance) => {
        this.InscModel.destroy({where: {id} })
          .then(() => {
            console.log('inscripcion borrada de la base de datos');
          }).
          error(() => {
            console.log('error al borrar la inscripcion de la bd');
          });
    });
  }
}
const modelo = InterfazInscripciones.init();
export default modelo;
