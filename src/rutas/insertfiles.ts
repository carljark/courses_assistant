import {Request, Response, Router} from 'express';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import config from '../environment';

class Ruta {
    public usuid = -1;
    public router: Router;
    constructor() {
      this.router = Router();
      this.routes();
    }
    public MainRoute(req: Request, res: Response): void {
      const form = new formidable.IncomingForm();
      form.parse(req, (errPase, fields, files) => {
        // chequear fields para ver si meto el tipo de archivo y bifurcarlo
        // quitar snapshots y meter tipodearchivo desde el fields
        if (fields.tipoarchivo === 'ejercicio') { // mejor que se sustituya solo en la cadena y quitar el if
          console.log('se llega a tipoarchivo ejercicio');
          form.uploadDir = path.join(
            __dirname,
            '../../',
            config.dirPublicName,
            fields.idcurso as string,
            '/lessons',
            fields.idlesson as string,
            fields.tipoarchivo,
            );
          // voy a tener que crear el directorio para ejercicio si no existe
          // voy a implementar el crear la carpeta multiplataforma
          //  child_process.execFile('/bin/mkdir', ['-p', form.uploadDir]);

        } else if (fields.tipoarchivo === 'texto') {
          console.log('textooooooooooo');
          form.uploadDir = path.join(__dirname,
            '../../',
            config.dirPublicName,
            fields.idcurso as string,
            '/lessons',
            fields.idlesson as string);
          console.log('form.uploadDir: ', form.uploadDir);
        } else {
          form.uploadDir = path.join(__dirname, '../../', config.dirPublicName, fields.idcurso as string, '/lessons');
        }

        console.log('se procede a crear la carpeta para el archivo');

        fs.mkdir(form.uploadDir, { recursive: true }, (errUpload) => {
          if (errUpload) {
            console.log('erro al crear la carpeta: ', errUpload);
          }
          console.log(`carpeta ${form.uploadDir} creada`);
          fs.copyFile(files.image.path, form.uploadDir + '/' + files.image.name, (err) => {
            if (err) {
              console.log('error al mover el archivo: ', err);
            }
            fs.unlink(files.image.path, (errUnlink) => {
              if (errUnlink) {
                console.log('error el borrar el archivo: ', errUnlink);
              }
              console.log('archivo original borrado');
            });
            console.log('archivo movido');
          });
        });

      });
      res.json('recibido');
    }

    public routes() {
      this.router.post('/insertfile', this.MainRoute);
    }
  }

const ruta = new Ruta().router;
export default ruta;
