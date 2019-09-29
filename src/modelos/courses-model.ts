// import * as Sequelize from 'sequelize';
import { Observable } from 'rxjs';
import { IcoursesModel, IcursosInstance } from '../models-factory/db';
import db from './db';
class InterfazCursos {
  public static init(): InterfazCursos {
    return new InterfazCursos();
  }
  public Cursos: IcoursesModel;
  constructor() {
    this.Cursos = db.import('../models-factory/courses-factory');
  }
  public updateById(id: number, nombre: string, onSuccess?: any, onError?: any) {
    this.Cursos.update({ nombrecurso: nombre}, {where: {id} }).
      then(() => {
        console.log('nombre actualizado');
      }).
      error(() => {
        console.log('error al actualizar el nombre del curso');
      });
  }
  public insertarUno(nombrecurso: string, pass: string): Observable<number> {
    return new Observable((observer) => {
      // revisar: id null
      this.Cursos.create({ id: null, nombrecurso })
      // revisar: x es una instancia?
      .then((x: IcursosInstance ) => {
        observer.next(x.id);
      });
    });
  }
  public conseguirTodas(): Observable<IcursosInstance[]> {
    return new Observable<IcursosInstance[]>((observer) => {
      this.Cursos.findAll({})
      .then((cursos) => {
        observer.next(cursos);
      });
    });
  }
  public getByName(nombre: string): Observable<IcursosInstance> {
    return new Observable ( (observador) => {
      this.Cursos.findOne({where: {nombrecurso: nombre}})
        .then((curso) => {
          observador.next(curso);
        });
    });
  }
  public borrarTodos(onSuccess?: any, onError?: any): any {
    this.Cursos.destroy({where: {}})
    .then(onSuccess)
    .catch(onError);
  }
  public retrieveById(id: number, onSuccess: any, onError: any) {
    this.Cursos.findOne({where: {id}})
      .then(onSuccess).error(onError);
  }
  public borrarporId(id: number) {
      this.Cursos.findOne({where: {id}})
      .then((resultado: IcursosInstance) => {
        this.Cursos.destroy({where: {id} })
          .then(() => {
            console.log('curso borrado de la base de datos');
          }).
          error(() => {
            console.log('error al borrar el curso de la bd');
          });
    });
  }
}
const modelo = InterfazCursos.init();
export default modelo;
