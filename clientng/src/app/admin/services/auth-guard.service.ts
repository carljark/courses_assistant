import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { UsuariosService } from './usuarios.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private ususrv: UsuariosService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.ususrv.getLogueado();
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/form']); // sustituir form por login en el nombre del componente
      // (es dedir: de formularios.component a login.component)
      return false;
    }
  }
}
