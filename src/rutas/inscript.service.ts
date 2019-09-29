import InterfazInscrip from '../modelos/inscript-model';
import {IusersAttribute as User} from '../models-factory/db';

export class InscriptService {
    public getInscript(user: User) {
        return InterfazInscrip.conseguirPorIdusuario(user.id);
    }
}
