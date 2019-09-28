/*eslint new-cap: 0*/
import { Component } from '@angular/core';
import { LoginService } from './shared/services/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  logueado = true;
  admin = false;
  subscript: Subscription;
  subscriptAdmin: Subscription;

  constructor(
    private router: Router,
    private loginsrc: LoginService,
  ) {
    this.logueado = loginsrc.getLogueado();
    this.admin = loginsrc.admin;
    this.subscript = loginsrc.logueadochange.subscribe((value) => {
      this.logueado = value;
    });
    this.subscript = loginsrc.adminchange.subscribe((value) => {
        this.admin = value;
    });
  }
  clicked() {
    const x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
      x.className += ' responsive';
    } else {
      x.className = 'topnav';
    }
  }
  logout() {
    this.loginsrc.logout();
    this.router.navigate(['/login']);
  }
}
