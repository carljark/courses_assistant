import childProcess from 'child_process';
import { NextFunction, Request, Response, Router} from 'express';
import path from 'path';
import config, {mode} from '../environment';
class BackupDb {
    public router: Router;
    constructor() {
      this.router = Router();
      this.routes();
    }
    private rutaprincipal(req: Request, res: Response, next: NextFunction): void {
      const db = config.databaseConfig.database;

      let rutaDockerPostgres;
      if (mode === 'production') {
        rutaDockerPostgres = '/usr/src/app/docker_postgres';
      } else {
        rutaDockerPostgres = path.join(__dirname, '../../docker_postgres');
      }

      // const pgExecString: string = 'pg_dump -U mastergodoy cursos -f ' + rutaDockerPostgres + '/' + db + '.sql';
      const pgExecString: string = `pg_dump -U mastergodoy cursos -f ${rutaDockerPostgres}/${db}.sql`;
      const sshExecString = `ssh -o StrictHostKeyChecking=no root@172.28.1.2 \"${pgExecString}\"`;

      if (mode === 'development') {
        console.log('no production');
        childProcess.exec(pgExecString, (err, stdout, stderr) => {
          if (err) {
            console.log('err pg_dump: ', err);
            res.sendStatus(404);
          } else {
            console.log(stdout);
            console.log(stderr);
            res.json({ok: true});
          }
        });
      } else {
        console.log('production --> ssh');
        childProcess.exec(sshExecString, (err, stdout, stderr) => {
          if (err) {
            console.log('err pg_dump: ', err);
            res.sendStatus(404);
          } else {
            console.log(stdout);
            console.log(stderr);
            res.json({ok: true});
          }
        });
      }
    }

    private routes() {
      this.router.post('/', this.rutaprincipal);
    }
}
const backDbRoute = new BackupDb().router;
export default backDbRoute;
