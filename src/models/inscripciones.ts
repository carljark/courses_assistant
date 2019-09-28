import * as sqlz from 'sequelize';
import {DataTypes as DatTyps} from 'sequelize';
import {
  InscriptionsAttribute,
  InscriptionsInstance,
} from './db';

module.exports = function(sequelize: sqlz.Sequelize, DataTypes: DatTyps) {
  return sequelize.define<InscriptionsInstance, InscriptionsAttribute>('inscripciones', {
    caducidad: {
      allowNull: false,
      field: 'caducidad',
      type: DataTypes.INTEGER,
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
    idusuario: {
      allowNull: false,
      field: 'idusuario',
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'inscripciones',
  });
};
