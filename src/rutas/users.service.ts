import users from '../modelos/users-model';
import modelUsers from '../modelos/users-model';

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
