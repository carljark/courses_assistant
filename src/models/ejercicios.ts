import * as sqlz from 'sequelize';
import {DataTypes as DatTyps} from 'sequelize';
import {
  IexercisesAttribute,
  IexercisesInstance,
} from './db';

module.exports = function(sequelize: sqlz.Sequelize, DataTypes: DatTyps) {
  return sequelize.define<IexercisesInstance, IexercisesAttribute>('ejercicios', {
    archivo: {
      allowNull: false,
      field: 'archivo',
      type: DataTypes.STRING,
    },
    id: {
      allowNull: false,
      autoIncrement: true,
      field: 'id',
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    idlesson: {
      allowNull: false,
      field: 'idsnapshot',
      type: DataTypes.INTEGER,
    },
    resuelto: {
      allowNull: true,
      field: 'resuelto',
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'ejercicios',
  });
};
