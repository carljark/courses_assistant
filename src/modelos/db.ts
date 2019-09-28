import Sequelize from 'sequelize';
import config, {mode} from '../environment';
import { Iconfigdb } from './configdb.class';
import { dev, production } from './database.json';

// tengo repetidos los datos de la configuración de la base de datos
// en environment y en database.json, corregir

export class DefineDb {
    public static authenticated = false;
    public cf: Iconfigdb;
    public sequelize: Sequelize.Sequelize;

    constructor() {
        if (mode === 'development') {
            this.cf = dev;
        } else {
            this.cf = production;
        }

        // const dburl = process.env.DATABASE_URL;
        // this.sequelize = new Sequelize(process.env.DATABASE_URL);
        // console.log('DATABASE_URL: ', dburl);

        this.sequelize = new Sequelize(
            this.cf.database,
            this.cf.user,
            this.cf.password,
            {
                define: {
                    timestamps: false,
                },
                dialect: this.cf.driver,
                host: this.cf.host,
                // logging: console.log,
                logging: false,
                operatorsAliases: false,
            },
        );
        this.sequelize.authenticate()
        .then(() => {
          console.log('Connection has been established successfully.');
          DefineDb.authenticated = true;
        })
        .catch((err) => {
          console.error('Unable to connect to the database');
          DefineDb.authenticated = false;
        });
    }
}
const db = new DefineDb().sequelize;
export default db;
