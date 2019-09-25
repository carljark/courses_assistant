import users from '../modelos/usuarios';
import modelUsers from '../modelos/usuarios';

export default class UsersService {
  constructor() {
  }
  public getByName(username: string) {
    users.getByName(username)
  }
  public addUser(nombre: string, password: string) {
    return modelUsers.insertarUno(
      nombre,
      password
    )
  }

  uselDelById(id: number) {
    return modelUsers.borrarporId(id)
  }
}
