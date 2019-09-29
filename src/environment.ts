export const mode = process.env.NODE_ENV;

export interface IDatabaseConfig {
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
    dockerdev: IConfig;
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
        dirPublicName: 'publiccoursesdev',
        lessonsDirName: 'lessons',
        port: 8442,
        publicRouteName: 'courses',
        urlServer: 'http://localhost:8442',
    },
    dockerdev: {
        databaseConfig: {
            database: 'cursosdev',
            driver: 'postgres',
            host: '172.28.1.2',
            password: '1aB|pori',
            user: 'mastergodoy',
        },
        dirPublicName: 'publiccoursesdev',
        lessonsDirName: 'lessons',
        port: 8443,
        publicRouteName: 'courses',
        urlServer: 'https://carlosalbertogodoy.ddns.net',
    },
    production: {
        databaseConfig: {
            database: 'cursos',
            driver: 'postgres',
            host: '172.28.1.2',
            password: '1aB|pori',
            user: 'mastergodoy',
        },
        dirPublicName: 'publiccourses',
        lessonsDirName: 'lessons',
        port: 8443,
        publicRouteName: 'courses',
        urlServer: 'https://carlosalbertogodoy.ddns.net',
    },
};

let config: IConfig;
if (mode === 'development') {
    config = configurations.development;
} else if (mode === 'dockerdev') {
    config = configurations.dockerdev;
} else {
    config = configurations.production;
}

export default config;
