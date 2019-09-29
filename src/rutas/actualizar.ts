import { Request, Response, Router } from 'express';
import modeloportada from '../modelos/lessons-model';

class Ruta {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public rutaprincipal(req: Request, res: Response): void {
        const idLesson = parseInt(req.params.id, 10);
        modeloportada.buildall(
            {
                archivo: req.body.imagen.archivo,
                editsino: req.body.imagen.editsino,
                id: parseInt(req.params.id, 10),
                idcurso: req.body.imagen.idcurso,
                nombremostrado: req.body.imagen.nombremostrado,
                serie: req.body.imagen.serie,
            },
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
        modeloportada.borrarporId(idLesson);
        res.end();
    }

    private routes() {
        this.router.put('/:id', this.rutaprincipal);
        this.router.post('/:id', this.rutaborrarid.bind(this));
    }
}
const ruta = new Ruta().router;
export default ruta;
