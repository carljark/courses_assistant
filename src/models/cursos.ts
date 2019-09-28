import * as seqlz from 'sequelize';
import {DataTypes as DatTypes} from 'sequelize';
import {
  IcoursesAttribute,
  IcursosInstance,
} from './db';

module.exports = function(sequelize: seqlz.Sequelize, DataTypes: DatTypes) {
  return sequelize.define<IcursosInstance, IcoursesAttribute>('cursos',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      field: 'id',
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nombrecurso: {
      allowNull: true,
      field: 'nombrecurso',
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'cursos',
  },
  );
};
