/* jshint indent: 1 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {cursosInstance, cursosAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
	return sequelize.define<cursosInstance, cursosAttribute>('cursos', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		nombrecurso: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'nombrecurso'
		}
	}, {
		tableName: 'cursos'
	});
};
