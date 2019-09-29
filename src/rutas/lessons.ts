// var express = require('express');
import { Request, Response, Router } from 'express';
import InterfazEjercicios from '../modelos/exercises-model';
import InterfazSnapshots from '../modelos/lessons-model';

class RouterSnapshots {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }
    public ejercicios(req: Request, res: Response): void {
        InterfazEjercicios.buscarporIdsnapshot(req.body.idlesson)
        .subscribe((ej) => {
            if (ej.length < 1) {
                res.send(null);
            } else {
                res.json(ej);
            }
        });
    }

    public rutaprincipal(req: Request, res: Response): void {
        const userid = parseInt(res.locals.decoded.sub, 10);
        const idcurso = req.body.idcurso; // curso solicitado
        InterfazSnapshots.build();
        // en la siguiente pedimo las portadas según el curso elegido
        InterfazSnapshots.conseguirTodas(idcurso) // here
        .subscribe((snapshots) => {
            if (snapshots) {
                res.json(snapshots);
            } else {
                res.status(401).send('no hay snapshots en la tabla');
            }
            }, (error: any ) => {
                console.log('error: ', error);
                res.send('error en la tabla');
        });
    }

    public rutaId(req: Request, res: Response): void {
        const idLesson = parseInt(req.params.id, 10);
        InterfazSnapshots.build();
        InterfazSnapshots.retrieveById(idLesson)
        .subscribe((lesson) => {
            if (lesson) {
                res.json(lesson);
            } else {
                res.status(500).send('Lesson no encontrado por el id');
            }
        });
    }

    private routes() {
        this.router.post('/ejercicios', this.ejercicios);
        this.router.post('/', this.rutaprincipal);
        this.router.get('/:id', this.rutaId);
    }
}
const rutaportada = new RouterSnapshots().router;
export default rutaportada;
