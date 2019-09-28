// import * as Sequelize from 'sequelize';
import db from './db';
import { Observable } from 'rxjs';
import { InscriptionsModel, InscriptionsInstance } from '../models/db';
class InterfazInscripciones {
  InscModel: InscriptionsModel;
  constructor(){
    this.InscModel = db.import('../models/inscripciones');
  }
  static init(): InterfazInscripciones {
    return new InterfazInscripciones();
  }
  insertarUno(idusuario: number, idcurso: number, caducidad: Date ): Observable<number> {
    return new Observable(observer => {
      this.InscModel.create({
        id: null,
        idusuario: idusuario,
        idcurso: idcurso,
        caducidad: caducidad
      })
      .then((x: InscriptionsInstance ) => {
        observer.next(x.id);
      })
    });
  }
  conseguirTodas(onSuccess?: any, onError?: any): any {
    this.InscModel.findAll({})
    .then(onSuccess)
    .catch(onError);
  }
  conseguirPorIdusuario(idusuario: number): Observable<InscriptionsInstance[]> {
    return new Observable(observer => {
      this.InscModel.findAll({ where: {idusuario: idusuario} })
      .then(cursos => {
        observer.next(cursos);
      });
    });
  }
  borrarTodos(onSuccess?: any, onError?: any): any {
    this.InscModel.destroy({where: {}})
    .then(onSuccess)
    .catch(onError);
  };
  retrieveById(id: number, onSuccess: any, onError: any) {
    this.InscModel.findOne({where: {id: id}})
      .then(onSuccess).error(onError);
  }
  borrarporId(id: number){
      this.InscModel.findOne({where: {id: id}})
      .then((resultado: InscriptionsInstance) => {
        this.InscModel.destroy({where: {id: id} })
          .then(() => {
            console.log('inscripcion borrada de la base de datos');
          }).
          error(() => {
            console.log('error al borrar la inscripcion de la bd');
          });
    })
  }
}
const modelo= InterfazInscripciones.init();
export default modelo;
