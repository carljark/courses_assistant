import { exec } from 'child_process';
import { NextFunction, Request, Response, Router } from 'express';
import { platform } from 'os';

// import {} from 'ua-parser';

import config from '../environment';

const urlServer = config.urlServer;

const urlsAllowed = ['192.168.1.3', '192.168.1.1', '1'];

const badWords = ['xmlrpc', 'php'];

class RouterLogin {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  public rutaprincipal(req: Request, res: Response, next: NextFunction): void {

    // voy a buscar en req.url si existe algunas de las palabras en badWords
    let existBadWord = -1;
    const url = req.url;
    let badWord = '';

    badWords.forEach((word) => {
      if (url.lastIndexOf(word) !== -1) {
        existBadWord = url.lastIndexOf(word);
        badWord = word;
      }
    });

    if (existBadWord !== -1) {
      console.log('bad word finded: ', badWord);
      console.log('url requested: ', url);
      console.log('req.headers.user-agent: ', req.headers['user-agent']);
      const ip = req.ip.substring(req.ip.lastIndexOf(':') + 1);
      const encontrada = urlsAllowed.lastIndexOf(ip);
      if (encontrada !== -1) {
        console.log('ip encontrada: ', encontrada);
        this.redirectIp(req, res, next);
        // next();
      } else {
        console.log('ip no registrada', ip);
        console.log('hora: ', new Date());
        console.log('se procede a bloquear la ip');
        if (platform.toString() !== 'win32') {
          exec(
            `sudo iptables -A INPUT -s ${ip} -j DROP`,
            (err, stdout, stderr) => {
              if (err) {
                return;
              }
              // muestro la salida normal y de error de la consola
              // console.log(`stdout: ${stdout}`);
              // console.log(`stderr: ${stderr}`);
            },
          );
        } else {
          // netsh advfirewall firewall Agregar nombre de la regla
          // "abrir puerto 80" dir = acción = Permitir protocolo = TCP PuertoLocal = 80
        }
      }
    } else {
      this.redirectIp(req, res, next);
      // next();
    }
  }

  private redirectIp(req: Request, res: Response, next: NextFunction) {
    // console.log(req.url);
    // console.log(req.originalUrl);
    // console.log(req.ip);
    // console.log(req.path);
    console.log('hotname', req.hostname);
    console.log('protocol: ', req.protocol);
    // si se solicita la web y no se está en modo development...
    if (req.protocol === 'http' && req.hostname !== 'localhost') {
      res.redirect(urlServer);
    }
    next();
  }

  private routes() {
    this.router.use(this.rutaprincipal.bind(this));
  }
}
const ruta = new RouterLogin().router;
export default ruta;
