/* jshint indent: 1 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {ejerciciosInstance, ejerciciosAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
	return sequelize.define<ejerciciosInstance, ejerciciosAttribute>('ejercicios', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		idlesson: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'idsnapshot'
		},
		archivo: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'archivo'
		},
		resuelto: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'resuelto'
		}
	}, {
		tableName: 'ejercicios'
	});
};
