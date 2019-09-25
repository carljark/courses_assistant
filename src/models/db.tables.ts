// tslint:disable
import * as path from 'path';
import * as sequelize from 'sequelize';
import * as def from './db';

export interface ITables {
  snapshots:def.snapshotsModel;
  usuarios:def.usuariosModel;
  cursos:def.cursosModel;
  inscripciones:def.inscripcionesModel;
  ejercicios:def.ejerciciosModel;
}

export const getModels = function(seq:sequelize.Sequelize):ITables {
	const tables:ITables = {
		snapshots: seq.import(path.join(__dirname, './snapshots')),
		usuarios: seq.import(path.join(__dirname, './usuarios')),
		cursos: seq.import(path.join(__dirname, './cursos')),
		inscripciones: seq.import(path.join(__dirname, './inscripciones')),
		ejercicios: seq.import(path.join(__dirname, './ejercicios')),
	};
	return tables;
};
