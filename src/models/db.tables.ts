import * as path from 'path';
import * as sequelize from 'sequelize';
import * as def from './db';

export interface ITables {
    snapshots: def.IlessonsModel;
    usuarios: def.IUsersModel;
    cursos: def.IcoursesModel;
    inscripciones: def.InscriptionsModel;
    ejercicios: def.IexercisesModel;
}

export const getModels = function(seq: sequelize.Sequelize): ITables {
  const tables: ITables = {
    cursos: seq.import(path.join(__dirname, './cursos')),
    ejercicios: seq.import(path.join(__dirname, './ejercicios')),
    inscripciones: seq.import(path.join(__dirname, './inscripciones')),
    snapshots: seq.import(path.join(__dirname, './snapshots')),
    usuarios: seq.import(path.join(__dirname, './usuarios')),
  };
  return tables;
};
