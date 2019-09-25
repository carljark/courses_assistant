/* jshint indent: 1 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {inscripcionesInstance, inscripcionesAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
	return sequelize.define<inscripcionesInstance, inscripcionesAttribute>('inscripciones', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		idusuario: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'idusuario'
		},
		idcurso: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'idcurso'
		},
		caducidad: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'caducidad'
		}
	}, {
		tableName: 'inscripciones'
	});
};
