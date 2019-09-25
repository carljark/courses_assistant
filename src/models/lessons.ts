/* jshint indent: 1 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {snapshotsInstance, snapshotsAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
	return sequelize.define<snapshotsInstance, snapshotsAttribute>('lessons', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		nombremostrado: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'nombremostrado'
		},
		archivo: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'archivo'
		},
		serie: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'serie'
		},
		editsino: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'editsino'
		},
		idcurso: {
		type: DataTypes.INTEGER,
		allowNull: false,
		field: 'idcurso'
		},
		text: {
		type: DataTypes.STRING,
		allowNull: true,
		field: 'text'
		}
	}, {
		tableName: 'lessons'
	});
};
