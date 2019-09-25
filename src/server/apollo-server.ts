import { ApolloServer,  Config, gql } from 'apollo-server-express';

import Lesson from '../lesson.class';

import {ejerciciosInstance, snapshotsInstance} from '../models/db';

import db from '../modelos/db';
const LessonsTable = db.import('../models/lessons');
const ExercisesTable = db.import('../models/ejercicios');

// mejor voy a usar mi propia interfaz de modelo lessons
import fs from 'fs';
import path from 'path';
import { Exercise } from '../exercise.class';

import config from '../environment';

const lessonsDirName = 'lessons';

const leerfich = (data: Lesson): string => {
  if (data.text) {
    console.log('se ejecuta la mutation');
    const pathFullText = path.join(__dirname,
      '../',
      config.dirPublicName,
      data.idcurso.toString(),
      lessonsDirName,
      data.id.toString(),
      data.text.trimRight());
    // return data as Lesson;
    return fs.readFileSync(pathFullText).toString();
  } else {
    return '';
  }
};

const typeDefsFile = fs.readFileSync(path.join(__dirname, 'schema.gql'));

const typeDefs = gql`${typeDefsFile}`;
const resolvers = {
  /* Mutation: {
    someMutation: (root, args, context, info) => {}
  }, */
  Mutation: {
    /* post: (parent, args) => {
      const les1: Lesson = {id: 1000, archivo: 'yo.jpg', idcurso: 1, nombremostrado: 'este' };
      return les1; // funciona, devuelve el objeto entero, pero solo lo solicitado por el cliente
      // en este caso el id solicitado desde el cliente
    }, */
    delexer: async (parent, {id}: {id: number}, contexto: any) => {
      const result = await ExercisesTable.findOne({ where: { id }}) as ejerciciosInstance;
      const exercise: Exercise = {
        archivo: result.archivo,
        id: result.id,
        idlesson: result.idlesson,
      };
      const resultDestroy = await result.destroy();
      return exercise;
    },
    post: async (parent, {lesson}: {lesson: Lesson}, contexto: any) => {
      console.log('lesson: ', lesson);
      const lesarray = await LessonsTable.upsert(lesson, { returning: true });
      const les = lesarray[0] as snapshotsInstance;
      console.log('leccion creada: ', les.get());
      return les.get();
    },
    updatelessontext: async (parent, {lesson}: {lesson: Lesson}, contexto: any) => {
      const lesarray = await LessonsTable.upsert(lesson, { returning: true });
      const les = lesarray[0] as snapshotsInstance;
      console.log('lesson a actualizar: ', lesson);
      console.log('leccion actualizada: ', les.get());
      return les.get();
    },
  },
  Query: {
    bien: async (objeto: any, { idcurso }: Lesson, contexto: any) => {
      const lessons = await LessonsTable.findAll({ where: { idcurso } });
      return lessons;
    },
    cojones: (objeto: any, { idcurso }: Lesson, contexto: any) => {
      return LessonsTable.findAll({ where: { idcurso } })
      .then((data) => {
        return data;
      });
    },
    lesson: (parent, {id}: {id: number}, contexto) => {
      return LessonsTable.findOne({ where: {id}})
      .then((data: Lesson) => {
        return {
          archivo: data.archivo,
              fulltext: leerfich(data),
              id: data.id,
              idcurso: data.idcurso,
              nombremostrado: data.nombremostrado,
              text: data.text,
        };
      });
    },
    lessons: async (objeto: any, { idcurso }: Lesson, contexto: any) => {
      const lessons = await LessonsTable.findAll({ where: { idcurso } });
      return lessons;
    },
  },
} as Config['resolvers'];
export const apollo = new ApolloServer({typeDefs, resolvers});
