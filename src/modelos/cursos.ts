// import * as Sequelize from 'sequelize';
import db from './db';
import { Observable } from 'rxjs';
import { cursosModel, cursosInstance } from '../models/db';
class InterfazCursos {
  Cursos: cursosModel;
  constructor(){
    this.Cursos = db.import('../models/cursos');
  }
  static init(): InterfazCursos {
    return new InterfazCursos();
  }
  updateById (id: number, nombre: string, onSuccess?: any, onError?: any) {
    this.Cursos.update({ nombrecurso: nombre},{where: {id: id} }).
      then(() => {
        console.log('nombre actualizado');
      }).
      error(() => {
        console.log('error al actualizar el nombre del curso');
      });
  };
  insertarUno(nombrecurso: string, pass: string): Observable<number> {
    return new Observable(observer => {
      // revisar: id null
      this.Cursos.create({ id: null, nombrecurso: nombrecurso })
      // revisar: x es una instancia?
      .then((x: cursosInstance ) => {
        observer.next(x.id);
      })
    });
  }
  conseguirTodas(): Observable<cursosInstance[]> {
    return new Observable<cursosInstance[]>(observer => {
      this.Cursos.findAll({})
      .then(cursos => {
        observer.next(cursos);
      });
    })
  }
  getByName(nombre: string): Observable<cursosInstance> {
    return new Observable ( observador => {
      this.Cursos.findOne({where: {nombrecurso: nombre}})
        .then(curso => {
          observador.next(curso);
        });
    })
  }
  borrarTodos(onSuccess?: any, onError?: any): any {
    this.Cursos.destroy({where: {}})
    .then(onSuccess)
    .catch(onError);
  };
  retrieveById(id: number, onSuccess: any, onError: any) {
    this.Cursos.findOne({where: {id: id}})
      .then(onSuccess).error(onError);
  }
  borrarporId(id: number){
      this.Cursos.findOne({where: {id: id}})
      .then((resultado: cursosInstance) => {
        this.Cursos.destroy({where: {id: id} })
          .then(() => {
            console.log('curso borrado de la base de datos');
          }).
          error(() => {
            console.log('error al borrar el curso de la bd');
          });
    })
  }
}
const modelo= InterfazCursos.init();
export default modelo;
