import cors from 'cors';
import {  json, NextFunction, Request, Response, Router, static as estaticExpress, urlencoded } from 'express';
import path from 'path';

import updateRoute from './actualizar';
import backupRoute from './backupdb';
import initPortRoute from './initsnapshots';
import insertRoute from './insert';
import insertFilesRoute from './insertfiles';
import lessonsRoute from './lessons';
import loginRoute from './login';

import comprobartoken from './checktoken';
import usersRoute from './users';

import checkip from './checkip';

import config, {mode} from '../environment';

const allowCrossDomain = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*'); // here you can restrict Origin
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  // res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};

class PostRouter {
  public usuid = -1;
  public router: Router;
  constructor() {
    this.router = Router();
    this.router.use(cors());
    // allowCrossDomain falla
    // this.router.use(allowCrossDomain);
    this.router.use(json());
    this.router.use(urlencoded({ extended: false }));
    this.routes();
  }
  public lessons(req: Request, res: Response, next: NextFunction) {
    next();
  }
  public countries(req: Request, res: Response, next: NextFunction) {
    res.json(['España', 'Francia', 'Portugal']);
  }

  public routes() {
    // cuidado con checkip, la redireccion envia un res que
    // provoca que se establezcan los headers después de haberlos
    // enviado
    // this.router.use(checkip);
    this.router.use('/login', loginRoute);
    this.router.use('/backup', backupRoute);
    this.router.use('/graphql', comprobartoken);
    this.router.use('/api', comprobartoken);
    this.router.use('/api/users', usersRoute);
    this.router.use('/courses', this.lessons);
    this.router.use('/courses', estaticExpress(path.join(__dirname, '../../', config.dirPublicName)));
    this.router.use('/api/initportada', initPortRoute);
    this.router.use('/api/portada', lessonsRoute);
    this.router.use('/api/actualizar', updateRoute);
    this.router.use('/api/insertar', insertRoute);
    this.router.use('/api/countries', this.countries);
    this.router.use('/files', insertFilesRoute);
    // if mode development not serve ng compiled
    // instead check route url and res erro
    /* if (mode !== 'production') {
      this.router.all('/*', (req: Request, res: Response, next: NextFunction) => {
        console.log('se ha solicitado una ruta que no existe');
        res.sendStatus(500).end('no existe la ruta');
      });
    } else {
      this.router.use('/', estaticExpress(path.join(__dirname, '../../clientng/dist/curseitorng')));
      this.router.all('/*', (req: Request, res: Response, next: NextFunction) => {
        res.sendFile('index.html', { root: (path.join(__dirname, '../../clientng/dist/curseitorng')) });
      });
    } */
    this.router.use('/', estaticExpress(path.join(__dirname, '../../clientng/dist/curseitorng')));
    this.router.all('/*', (req: Request, res: Response, next: NextFunction) => {
      res.sendFile('index.html', { root: (path.join(__dirname, '../../clientng/dist/curseitorng')) });
    });
  }
}
const indexRouter = new PostRouter().router;
export default indexRouter;
