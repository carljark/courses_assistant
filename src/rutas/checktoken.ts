import cors from 'cors';
import {
  json,
  NextFunction,
  Request,
  Response,
  Router,
  urlencoded,
} from 'express';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
class PostRouter {
  public usuid = -1;
  public router: Router;
  constructor() {
    this.router = Router();
    this.router.use(cors());
    this.router.use(json());
    this.router.use(urlencoded({ extended: false }));
    this.routes();
  }
  public comprobartoken(req: Request, res: Response, next: NextFunction) {
    console.log('ruta solicitada: ', req.baseUrl);
    // comprobar también la lista de cursos que meteré en audience cuando se genera el token
    fs.readFile(__dirname + '/public.key', (err, data) => {
      if (err) {
        console.log('err: ', err);
      }
      const publicKey = data;
      if (req.headers.authorization) {
        // console.log('authorization: ', req.headers.authorization);
        // if check authorization and exists Bearer, drop it
        let authorization = req.headers.authorization;
        const findBearer = authorization.indexOf('Bearer');
        if (findBearer >= 0) {
          // console.log('encontrado Bearer');
          authorization = authorization.replace('Bearer ', '');
        }
        jwt.verify(
          authorization,
          publicKey,
          (errVerify: any, decoded: any) => {
            if (errVerify) {
              // console.log('errVerify: ', errVerify);
              res.json('no ha sido verificado el token en el middleware');
            } else {
              // console.log('index->comprobartoken->decoded: ', decoded);
              res.locals.decoded = decoded;
              next();
            }
          }
        );
      } else {
        console.log('no hay token en authorization en el middleware');
      }
    });
  }
  public routes() {
    this.router.use('*', this.comprobartoken);
  }
}
const indexRouter = new PostRouter().router;
export default indexRouter;
