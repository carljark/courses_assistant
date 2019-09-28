import InterfazInscrip from '../modelos/inscripciones';
import {IusersAttribute as User} from '../models/db';

export class InscriptService {
    public getInscript(user: User) {
        return InterfazInscrip.conseguirPorIdusuario(user.id);
    }
}
