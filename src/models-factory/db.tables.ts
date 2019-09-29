import * as path from 'path';
import * as sequelize from 'sequelize';
import * as def from './db';

export interface ITables {
    lessons: def.IlessonsModel;
    users: def.IUsersModel;
    courses: def.IcoursesModel;
    inscripts: def.InscriptionsModel;
    exercises: def.IexercisesModel;
}

export const getModels = (seq: sequelize.Sequelize): ITables => {
  const tables: ITables = {
    courses: seq.import(path.join(__dirname, './courses-factory')),
    exercises: seq.import(path.join(__dirname, './exercises-factory')),
    inscripts: seq.import(path.join(__dirname, './inscript-factory')),
    lessons: seq.import(path.join(__dirname, './lessons-factory')),
    users: seq.import(path.join(__dirname, './users-factory')),
  };
  return tables;
};
