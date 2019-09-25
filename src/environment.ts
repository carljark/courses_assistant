export const mode = process.env.NODE_ENV;

interface IDatabaseConfig {
    database: string;
    driver: string;
    host: string;
    password: string;
    user: string;
}

interface IConfig {
    databaseConfig: IDatabaseConfig;
    dirPublicName: string;
    lessonsDirName: string;
    port: number;
    publicRouteName: string;
    urlServer: string;
}

interface IConfigModes {
    development: IConfig;
    production: IConfig;
}

const configurations: IConfigModes = {
    development: {
        databaseConfig: {
            database: 'cursosdev',
            driver: 'postgres',
            host: '',
            password: '1aB|pori',
            user: 'mastergodoy',
        },
        dirPublicName: 'publicdev',
        lessonsDirName: 'lessons',
        port: 8442,
        publicRouteName: 'courses',
        urlServer: 'http://localhost:8442',
    },
    production: {
        databaseConfig: {
            database: 'cursos',
            driver: 'postgres',
            host: '',
            password: '1aB|pori',
            user: 'mastergodoy',
        },
        dirPublicName: 'public',
        lessonsDirName: 'lessons',
        port: 8443,
        publicRouteName: 'courses',
        urlServer: 'https://carlosalbertogodoy.ddns.net',
    },
};

let config: IConfig;
if (mode === 'development') {
    config = configurations.development;
} else {
    config = configurations.production;
}

export default config;
