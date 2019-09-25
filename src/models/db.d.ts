// tslint:disable
import * as Sequelize from 'sequelize';


// table: snapshots
export interface snapshotsAttribute {
	nombremostrado?:string;
	archivo?:string;
	serie?:string;
	editsino?:boolean;
	id?:number;
	idcurso:number;
	text?: string;
}
export interface snapshotsInstance extends Sequelize.Instance<snapshotsAttribute>, snapshotsAttribute { }
export interface snapshotsModel extends Sequelize.Model<snapshotsInstance, snapshotsAttribute> { }

// table: usuarios
export interface usuariosAttribute {
	id:number;
	nombre?:string;
	password?:string;
}
export interface usuariosInstance extends Sequelize.Instance<usuariosAttribute>, usuariosAttribute { }
export interface usuariosModel extends Sequelize.Model<usuariosInstance, usuariosAttribute> { }

export interface cursosAttribute {
	id:number;
	nombrecurso?:string;
}
export interface cursosInstance extends Sequelize.Instance<cursosAttribute>, cursosAttribute { }
export interface cursosModel extends Sequelize.Model<cursosInstance, cursosAttribute> { }


export interface inscripcionesAttribute {
	id:number;
	idusuario:number;
	idcurso:number;
	caducidad:Date; // averiguar cuál es el mejor tipo para la fecha en postgresql con sequelize
}
export interface inscripcionesInstance extends Sequelize.Instance<inscripcionesAttribute>, inscripcionesAttribute { }
export interface inscripcionesModel extends Sequelize.Model<inscripcionesInstance, inscripcionesAttribute> { }

export interface ejerciciosAttribute {
	id:number;
	idlesson:number;
	archivo:string;
	resuelto?:string;
}
export interface ejerciciosInstance extends Sequelize.Instance<ejerciciosAttribute>, ejerciciosAttribute { }
export interface ejerciciosModel extends Sequelize.Model<ejerciciosInstance, ejerciciosAttribute> { }