import { NextFunction, Request, Response, Router } from 'express';
import path from 'path';

class RouterLogin {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  public rutaprincipal(req: Request, res: Response, next: NextFunction) {
    console.log('ruta cert');
    res.sendFile(path.join(__dirname, './../.well-known/acme-chellenge/Y2PbimdbHAQ3g5CqUc8XR3RfbU8OAY9WtNGsNVH5uOI'));
    // next();
  }

  private routes() {
    this.router.use('/.well-known/acme-challenge/Y2PbimdbHAQ3g5CqUc8XR3RfbU8OAY9WtNGsNVH5uOI', this.rutaprincipal);
  }
}
const ruta = new RouterLogin().router;
export default ruta;
