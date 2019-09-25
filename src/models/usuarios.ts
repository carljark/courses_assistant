/* jshint indent: 1 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {usuariosInstance, usuariosAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
	return sequelize.define<usuariosInstance, usuariosAttribute>('usuarios', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		nombre: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'nombre'
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'password'
		}
	}, {
		tableName: 'usuarios'
	});
};
