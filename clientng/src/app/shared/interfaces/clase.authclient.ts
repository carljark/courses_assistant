import IdCursoNombre from './clase.idcursonombre';
export default interface AuthClient {
    token: string;
    // clavePublica: string;
    userid: number;
    idscursosnombres: IdCursoNombre[];
}
