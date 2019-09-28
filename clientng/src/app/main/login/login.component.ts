import { Component, OnInit} from '@angular/core';
import { LoginService } from '../../shared/services/login.service';
import { Router } from '@angular/router';

interface IUser {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: IUser = { username: '', password: ''};

  constructor(
    private loginservice: LoginService,
    private router: Router
    ) { }
  login(user: IUser) {
    this.loginservice.login(user)
    .subscribe(auth => {
      this.router.navigate(['/cursos']);
    });
  }
}
