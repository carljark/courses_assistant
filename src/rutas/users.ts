import { Router, Request, Response } from 'express';
import modelUsers from '../modelos/users-model';
class RouterUser {
    router: Router;
    constructor(){
      this.router = Router();
      this.routes();
    }
    addUser(req: Request, res: Response): void {
      console.log('addUser -> req.body: ', req.body);
      modelUsers.insertarUno(
        req.body.nombre,
        req.body.password
      )
      .subscribe(id => {
        console.log('id del usuario insertado', id);
        res.json(id);
      })
    }

    uselDelById(req: Request, res: Response): void {
      modelUsers.borrarporId(req.body.id)
      .subscribe(ok => {
        console.log('borrado?: ', ok);
        res.end();
      })
    }
    public getusers(req: Request, res: Response): void {
      modelUsers.getAll()
      .subscribe((users) => {
        res.send(users);
      })
    }

    private routes() {
      this.router.post('/', this.addUser);
      // this.router.put('/:id',this.addUser);
      this.router.post('/:id', this.uselDelById);
      this.router.get('/getusers', this.getusers.bind(this));
    }
}
const ruta = new RouterUser().router;
export default ruta;
