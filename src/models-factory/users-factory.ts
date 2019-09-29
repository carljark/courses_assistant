import * as sqlz from 'sequelize';
import {DataTypes as DatTyps} from 'sequelize';
import {
  IusersAttribute,
  IUsersInstance,
} from './db';

export default (sequelize: sqlz.Sequelize, DataTypes: DatTyps) => {
  return sequelize.define<IUsersInstance, IusersAttribute>('usuarios', {
    id: {
      allowNull: false,
      autoIncrement: true,
      field: 'id',
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nombre: {
      allowNull: true,
      field: 'nombre',
      type: DataTypes.STRING,
    },
    password: {
      allowNull: true,
      field: 'password',
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'usuarios',
  });
};
