import fs from 'fs';
import path from 'path';
import { join } from 'path';
import { Observable } from 'rxjs';
import { camelize } from '../camelize';
import Lesson from '../clasesnapshot';
import config from '../environment';
import * as dbDef from '../models-factory/db';
import db from './db';
import rmDirAsync from './rmdir';

class InterfazSnapshopts {

  public static init(): InterfazSnapshopts {
    console.log('se define el modelo lessons');
    return new InterfazSnapshopts();
  }

  public LessonsModel: dbDef.IlessonsModel;

  private pathLessonBase = join(__dirname, '../../', config.dirPublicName);

  constructor() {
    this.LessonsModel = db.import('../models-factory/lessons-factory');
  }

  public updateById(pavId: number, pavModel: string, onSuccess?: any, onError?: any): Observable<boolean> {
    const id = pavId;
    return new Observable<boolean>((ob) => {
      this.LessonsModel.update({ nombremostrado: pavModel}, {where: {id} }).
      then(() => {
        console.log('snapshot actualizada');
        ob.next(true);
      }).
      error(() => {
        console.log('error al actualizar el snapshot');
        ob.next(false);
      });

    });
  }

  public insertarUno(archivo: string, idcurso: number): Observable<number> {
    return new Observable((ob) => {
      this.LessonsModel.create({
        archivo,
        editsino: false,
        idcurso,
        nombremostrado: camelize(archivo.slice(0, -4)),
      })
      .then((x) => {
        ob.next(x.id);
      });
    });
  }
  public conseguirTodas(idcurso: number): Observable<Lesson[]> {
    return new Observable<Lesson[]>((ob) => {
      this.LessonsModel.findAll({ where: { idcurso }})
      .then((todas) => {
        ob.next(todas);
      });
    });
  }

  public build(): any {
    this.LessonsModel.build();
  }

  public buildall(snapshot: Lesson): any {
    this.LessonsModel.build(snapshot);
  }

  public borrarTodos(userid: number): any {
    this.LessonsModel.destroy({where: {userid}})
    .then((resborrado) => {
      console.log('borrado todo lo del usuario');
    });
  }

  public insertarMatriz(matriz: Lesson[], idcurso: number, correcto?: any, enError?: any): Observable<Lesson[]> {
    const snapshotssalvados: Lesson[] = [];
    let contador = 0;
    return new Observable((ob) => {
      matriz.forEach((snapshot: Lesson, index, array) => {
        this.LessonsModel.build({
          archivo: snapshot.archivo,
          editsino: snapshot.editsino,
          idcurso,
          nombremostrado: snapshot.nombremostrado,
        })
        .save()
        .then((x) => {
          const snapshotsalvada = new Lesson();
          snapshotsalvada.id = x.get('id');
          snapshotsalvada.archivo = x.get('archivo');
          snapshotsalvada.nombremostrado = x.get('nombremostrado');
          snapshotssalvados.push(snapshotsalvada);
          contador++;
          if (contador === array.length) {
            console.log('salvadas: ', snapshotssalvados);
            ob.next(snapshotssalvados);
          }
          }).error(() => {
            console.log('save of lessons array failed');
          });
      });
    });
  }

  public retrieveById(id: number): Observable<Lesson> {
    return new Observable<Lesson>((ob) => {
      this.LessonsModel.find({where: {id}})
      .then((lesson) => {
        ob.next(lesson);
        ob.complete();
      })
      .error((onError) => {
        console.log(onError);
      });
    });
  }

  public borrarporId(id: number) {
      this.LessonsModel.findOne({where: {id}})
      .then((lessonFinded) => {
        const archivo = path.join(__dirname, '../../', config.dirPublicName)
        + '/' + lessonFinded.idcurso.toString()
        + '/' + config.lessonsDirName + '/'
        + lessonFinded.getDataValue('archivo');
        console.log('snapshot encontrada: ', lessonFinded.archivo);
        // es mejor que implemente el borrado de archivos en su ruta correspondiente
        // porque aquí solo estamos borrando un archivo
        fs.access(archivo, (file) => {
          fs.unlink(archivo, (borrado) => console.log(borrado));
        });
        const lessonDir = `${this.pathLessonBase}/${lessonFinded.idcurso}/${config.lessonsDirName}/${id}`;
        fs.access(lessonDir, (errAccess) => {
          if (errAccess) {
            // console.log('errAccessdir: ', errAccess);
          } else {
            rmDirAsync(`${lessonDir}`, (err) => {
                if (err) {
                    // console.log('error rmDirAsync: ', err);
                }
            });
          }
        });
        this.LessonsModel.destroy({where: {id} }).
          then(() => {
            console.log('snapshot borrada de la base de datos');
          }).
          error(() => {
            console.log('error al borrar la snapshot de la bd');
          });
    });
  }
}
const modelosnapshot = InterfazSnapshopts.init();
export default modelosnapshot;
