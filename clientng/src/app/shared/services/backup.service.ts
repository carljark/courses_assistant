import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackupService {

  private backupUrl = environment.urlServer + '/backup';

  constructor(
    private http: HttpClient,
  ) {}

  public backup() {
    return this.http.post<boolean>( this.backupUrl, {} );
  }
}
