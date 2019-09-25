import { Request, Response, Router } from 'express';
import { rmdir } from 'fs';
import { join } from 'path';
import modeloportada from '../modelos/lessons';

import config, {mode} from '../environment';

class Ruta {
    public router: Router;
    private pathLessonBase = join(__dirname, '../', config.dirPublicName);

    constructor() {
        this.router = Router();
        this.routes();
    }

    public rutaprincipal(req: Request, res: Response): void {
        let idcurso = 0;
        const idLesson = parseInt(req.params.id, 10);
        idcurso = parseInt(res.locals.decoded.sub, 10);
        modeloportada.buildall(
            {
                archivo: req.body.imagen.archivo,
                editsino: req.body.imagen.editsino,
                id: parseInt(req.params.id, 10),
                idcurso: req.body.imagen.idcurso,
                nombremostrado: req.body.imagen.nombremostrado,
                serie: req.body.imagen.serie,
            }
        );
        modeloportada.updateById(idLesson, req.body.imagen.nombremostrado)
        .subscribe((ok) => {
            if (ok) {
                console.log('actualización hecha correctamente en la bd');
                res.send(
                    {
                        cod: 0,
                        mensaje: 'actualización hecha correctamente en la bd',
                    });
            } else {
                res.send(
                    {
                        cod: 1,
                        mensaje: 'no se ha actualizado la snapshot en la bd',
                    });
            }
        });
    }

    public rutaborrarid(req: Request, res: Response): void {
        console.log('borrar por id');
        const idLesson = parseInt(req.params.id, 10);

        // cuidado porque en borrarporId ya borro la imagen de la leccion
        modeloportada.borrarporId(idLesson);
        // this.deleteFiles(req.params.id, req.body.imagen.idcurso);
        res.end();

    }

    private deleteFiles(id: number, idcourse: number) {
        // falta el curso actual
        const lessonDir = `${this.pathLessonBase}/${idcourse}/${config.lessonsDirName}/${id}`;
        rmdir(`${lessonDir}`, (err) => {
            if (err) {
                console.log('error: ', err);
            }
        });
    }
    private routes() {
        this.router.put('/:id', this.rutaprincipal);
        this.router.post('/:id', this.rutaborrarid.bind(this));
    }
}
const ruta = new Ruta().router;
export default ruta;
