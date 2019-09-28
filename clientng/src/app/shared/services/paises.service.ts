import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  paises: any = {};

  provincias = [
'A Coruña',
'Álava',
'Albacete',
'Alicante',
'Almería',
'Asturias',
'Ávila',
'Badajoz',
'Islas Baleares',
'Barcelona',
'Burgos',
'Cáceres',
'Cádiz',
'Cantabria',
'Castellón',
'Ciudad Real',
'Córdoba',
'Cuenca',
'Girona',
'Granada',
'Guadalajara',
'Guipúzcoa',
'Huelva',
'Huesca',
'Jaén',
'La Rioja',
'Las Palmas',
'León',
'Lleida',
'Lugo',
'Madrid',
'Málaga',
'Murcia',
'Navarra',
'Orense',
'Palencia',
'Pontevedra',
'Salamanca',
'Segovia',
'Sevilla',
'Soria',
'Tarragona',
'Santa Cruz de Tenerife',
'Teruel',
'Toledo',
'Valencia',
'Valladolid',
'Vizcaya',
'Zamora',
'Zaragoza'
];

  constructor( public _http: HttpClient ) {}

  getPaises() {
    return this._http.get(environment.urlServer + '/api/countries');
  }
  getProvincias() {
    return this.provincias;
  }

}
