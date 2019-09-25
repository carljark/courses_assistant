import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminNavComponent} from './nav/admin-side-nav.component';
import {FormUsuarioComponent} from './form-usuario/form-usuario.component';
import {AuthGuardService} from '../shared/auth-guard.service';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminNavComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'users',
    component: FormUsuarioComponent,
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
