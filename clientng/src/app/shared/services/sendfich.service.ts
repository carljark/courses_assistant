import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';


import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Query} from '../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendfichService {
  urlservidor = '';
  ficheroelegido: File = null;
  constructor(
    private http: HttpClient,
    private apollo: Apollo
  ) {
    this.urlservidor = environment.urlServer;
  }
  enviarunicofichero(fichero: File, idcurso: number, tipoarchivo: string, idlesson: number): Observable<string> {
    const formFile = new FormData();
    formFile.append('image', fichero, fichero.name);
    formFile.append('idcurso', idcurso.toString());
    formFile.append('tipoarchivo', tipoarchivo);
    formFile.append('idlesson', idlesson.toString());
    return this.http.post<string>(this.urlservidor + '/files/insertfile', formFile);
    // sustituir por mulation de graphql apollo client
  }

  pruebaMuationgraphql(idcurso): Observable<any> {
    return this.apollo.watchQuery<Query>({
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
      query: gql`
         query bien {
           cojones(idcurso: ${idcurso}) {
             id
             archivo
             nombremostrado
             serie
             editsino
             idcurso
          }
        }
       `
    })
    .valueChanges;
    // .subscribe(result => {
    // this.imagenes = result.data && result.data.imagenes;
    // this.loading = result.loading;
    // this.errors = result.errors;
    // });
 }
}
