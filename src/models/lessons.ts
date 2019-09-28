import * as sqlz from 'sequelize';
import {DataTypes as DatTyps} from 'sequelize';
import {
  IlessonsAttribute,
  IlessonsInstance,
} from './db';

module.exports = function(sequelize: sqlz.Sequelize, DataTypes: DatTyps) {
  return sequelize.define<IlessonsInstance, IlessonsAttribute>('lessons', {
    archivo: {
      allowNull: true,
      field: 'archivo',
      type: DataTypes.STRING,
    },
    editsino: {
      allowNull: true,
      field: 'editsino',
      type: DataTypes.BOOLEAN,
    },
    id: {
      allowNull: false,
      autoIncrement: true,
      field: 'id',
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    idcurso: {
      allowNull: false,
      field: 'idcurso',
      type: DataTypes.INTEGER,
    },
    nombremostrado: {
      allowNull: true,
      field: 'nombremostrado',
      type: DataTypes.STRING,
    },
    serie: {
      allowNull: true,
      field: 'serie',
      type: DataTypes.STRING,
    },
    text: {
      allowNull: true,
      field: 'text',
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'lessons',
  });
};
