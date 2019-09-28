// table: categorias
export interface CategoriasDb {
  catId: number;
  catCatIdMadre?: number;
  catOrden?: number;
  catNombre: string;
  catNombreCorto?: string;
  catDescripcion?: string;
}

// table: categoriasUsuarios
export interface CategoriasUsuariosDb {
  cusId: number;
  cusUsuId: number;
  cusCatId: number;
}

// table: direcciones
export interface DireccionesDb {
  dirId: number;
  dirUsuId: number;
  dirPais: string;
  dirProvincia: string;
  dirPoblacion: string;
  dirCp: string;
  dirTvaCod?: string;
  dirNombreVia?: string;
  dirNumero: number;
  dirEscalera?: string;
  dirPiso?: string;
  dirPuerta?: string;
  dirDireccionLarga: string;
}

// table: facturaDetalle
export interface FacturaDetalleDb {
  fcdId: number;
  fcdFcmId: number;
}

// table: formadorUsuario
export interface FormadorUsuarioDb {
 forUsuId: number;
}

// table: insignia
export interface InsigniaDb {
  insSus: number;
  insUsu: number;
  insTexto: string;
}

// table: personas
export interface PersonasDb {
  perId: number;
  perUsuId?: number;
  perTpeCod?: string;
  perTdcCod?: string;
  perNombre: string;
  perApellidos: string;
  perRazonSocial: string;
}

// table: superUsuario
export interface SuperUsuarioDb {
  susUsuId: number;
  susNInsignias: number;
}

// table: facturaMaestro
export interface FacturaMaestroDb {
  fcmId: number;
  fcmUsuId: number;
  fcmDirId: number;
  fcmPerId: number;
}

// table: tipoDocumento
export interface TipoDocumentoDb {
  tdcCod: string;
  tdcNombre: string;
  tdcNombreCorto?: string;
}

// table: tipoPersona
export interface TipoPersonaDb {
  tpeCod: string;
  tpeDescripcion: string;
}

// table: tipoVia
export interface TipoViaDb {
  tvaCod: string;
  tvaDescripcion: string;
}

// table: usuarios
export interface UsuariosDb {
  usuId: number;
  usuPerId: number;
  usuDirId?: number;
  usuDirIdFacturacion?: number;
  usuCorreo: string;
  usuClave: string;
}
