import Sequelize from 'sequelize';
import { dev, production } from './database.json';
import config, {mode} from '../environment';
import { Iconfigdb } from './configdb.class';

// tengo repetidos los datos de la configuración de la base de datos
// en environment y en database.json, corregir

class CrearDb {
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
                logging: console.log,
                operatorsAliases: false,
            },
        );
    }
}
const db = new CrearDb().sequelize;
export default db;
