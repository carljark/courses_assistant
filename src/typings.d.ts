declare module '*database.json' {
    export const dev: {
        host: string,
        driver: string,
        user: string,
        database: string,
        password: string
        };
    export const production: {
        host: string,
        driver: string,
        user: string,
        database: string,
        password: string
    }
}

