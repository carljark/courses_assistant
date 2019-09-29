import * as Sequelize from 'sequelize';

// table: snapshots
export interface IlessonsAttribute {
  nombremostrado?: string;
  archivo?: string;
  serie?: string;
  editsino?: boolean;
  id?: number;
  idcurso: number;
  text?: string;
}

export interface IlessonsInstance extends Sequelize.Instance<IlessonsAttribute>, IlessonsAttribute { }
export interface IlessonsModel extends Sequelize.Model<IlessonsInstance, IlessonsAttribute> { }

// table: usuarios
export interface IusersAttribute {
  id: number;
  nombre?: string;
  password?: string;
}
export interface IUsersInstance extends Sequelize.Instance<IusersAttribute>, IusersAttribute { }
export interface IUsersModel extends Sequelize.Model<IUsersInstance, IusersAttribute> { }

export interface IcoursesAttribute {
  id: number;
  nombrecurso?: string;
}
export interface IcursosInstance extends Sequelize.Instance<IcoursesAttribute>, IcoursesAttribute { }
export interface IcoursesModel extends Sequelize.Model<IcursosInstance, IcoursesAttribute> { }

export interface InscriptionsAttribute {
  id: number;
  idusuario: number;
  idcurso: number;
  caducidad: Date; // averiguar cuál es el mejor tipo para la fecha en postgresql con sequelize
}
export interface InscriptionsInstance extends Sequelize.Instance<InscriptionsAttribute>, InscriptionsAttribute { }
export interface InscriptionsModel extends Sequelize.Model<InscriptionsInstance, InscriptionsAttribute> { }

export interface IexercisesAttribute {
  id: number;
  idlesson: number;
  archivo: string;
  resuelto?: string;
}
export interface IexercisesInstance extends Sequelize.Instance<IexercisesAttribute>, IexercisesAttribute { }
export interface IexercisesModel extends Sequelize.Model<IexercisesInstance, IexercisesAttribute> { }