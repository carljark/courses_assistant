import cors from 'cors';
import {  json, NextFunction, Request, Response, Router, static as estaticExpress, urlencoded } from 'express';
import path from 'path';

import rutaactualizar from './actualizar';
import routerinitport from './initsnapshots';
import insertar from './insertar';
import rutaInsertFiles from './insertFiles';
import rutaportada from './lessons';
import rutalogin from './login';

import comprobartoken from './comprobartoken';
import usersRoute from './users';

import checkip from './checkip';

import config from '../environment';

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
    // this.router.use(cors());
    this.router.use(allowCrossDomain);
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
    this.router.use(checkip);
    this.router.use('/autenticar', rutalogin);
    this.router.use('/graphql', comprobartoken);
    this.router.use('/api', comprobartoken);
    this.router.use('/api/users', usersRoute);
    this.router.use('/courses', this.lessons);
    this.router.use('/courses', estaticExpress(path.join(__dirname, '../', config.dirPublicName)));
    this.router.use('/api/initportada', routerinitport);
    this.router.use('/api/portada', rutaportada);
    this.router.use('/api/actualizar', rutaactualizar);
    this.router.use('/api/insertar', insertar);
    this.router.use('/api/countries', this.countries);
    this.router.use('/files', rutaInsertFiles);
    this.router.use('/', estaticExpress(path.join(__dirname, '../cliente')));
    this.router.all('/*', (req: Request, res: Response, next: NextFunction) => {
      res.sendFile('index.html', { root: (path.join(__dirname, '../cliente')) });
    });
  }
}
const indexRouter = new PostRouter().router;
export default indexRouter;
