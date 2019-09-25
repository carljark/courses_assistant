import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { PasswordValidation } from './validadores.class';
import { User } from './../models/user.model';
import { PersonasDb } from './../models/dbinterfaces';
import { UsuariosService } from './../services/usuarios.service';
import { PaisesService } from './../services/paises.service';

export const passwordDiferenteValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const uno = control.get('password');
  const dos = control.get('confirmPassword');

  return uno && dos && uno.value !== dos.value ? { NoMatchPassword: true } : null;
};

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {
  // @Input()
  // useract: User;

  yaregistrado = false;
  userForm: FormGroup;
  unamePattern = '^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,20}$';
  // patroncodigopostal = '^\s*?\d{5}(?:[-\s]\d{4})?\s*?$';
  patroncodigopostal = '^[0-9]{5}$';
  patrontelefono = '^[0-9]{9}$';
  // patrontelf = '[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}';
  patronemail: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  patronpassword = '(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$';

  @Input() user: User = {
    userid: null,
    nombre: null,
    apellidos: null,
    pais: 'España',
    provincia: '',
    domicilio: '',
    cPostal: null,
    mail: '',
    tel: null,
    password: '',
    password2: ''
  };

  submitted = false;
  paises: any;
  provincias: string[] = [];
  pais: string;

  constructor(
    public countries: PaisesService,
    private usersService: UsuariosService,
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.countries.getPaises().subscribe(
      (resp: any) => {
        this.paises = resp;
      });

    // this.user = this.useract;

    // this.provincias = this._paises.getProvincias();
    this.userForm = this.fb.group({
      nombre: [this.user.nombre, [Validators.required, Validators.pattern(this.unamePattern)]],
      apellidos: [this.user.apellidos, Validators.required],
      pais: [this.user.pais],
      provincia: [this.user.provincia],
      domicilio: [this.user.domicilio],
      cPostal: [this.user.cPostal , Validators.pattern(this.patroncodigopostal)],
      mail: [this.user.mail, [Validators.required, Validators.pattern(this.patronemail)]],
      tel: [this.user.tel, Validators.pattern(this.patrontelefono)],
      repasswords: this.fb.group({
        password: [this.user.password, Validators.pattern(this.patronpassword)],
        confirmPassword: [this.user.password]},
        { validator: passwordDiferenteValidator }),
      // 'repasswords': this.fb.group({'password': [''], 'confirmPassword': ['']}, { validator: PasswordValidation.MatchPassword }),
    });
  }

  onSubmit() {
    this.submitted = true;
    this.user.apellidos = this.apellidos.value;
    this.user.cPostal = this.cPostal.value;
    this.user.domicilio = this.domicilio.value;
    this.user.mail = this.mail.value;
    this.user.nombre = this.nombre.value;
    this.user.pais = this.getpais.value;
    this.user.password = this.repasswords.get('password').value;
    this.user.provincia = this.getprov.value;
    this.user.tel = this.tel.value;
    console.log('se envia el usuario al servicio usuarios.service: ', this.user);
    this.usersService.addUser(this.user)
    .subscribe(datos => {
      console.log('datos devueltos por el servidor', datos);
      // hacer que el mail se ponga rojo si ya existe
    });
  }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.user); }

  get nombre() {
       return this.userForm.get('nombre');
  }
  get repasswords() {
    return this.userForm.get('repasswords');
  }
  get password() {
    return this.repasswords.get('password');
  }
  get confirmPassword() {
    return this.repasswords.get('confirmPassword');
  }
  get tel() {
    return this.userForm.get('tel');
  }
  get mail() {
    return this.userForm.get('mail');
  }
  get cPostal() {
    return this.userForm.get('cPostal');
  }
  get domicilio() {
    return this.userForm.get('domicilio');
  }
  get getpais() {
    return this.userForm.get('pais');
  }
  get getprov() {
    return this.userForm.get('provincia');
  }
  get apellidos() {
    return this.userForm.get('apellidos');
  }

  borrarUsuarioDePrueba() {
    this.usersService.borrarUsuarioporMail('carlosag31@hotmail.com')
    .subscribe((user) => {
      console.log(user);
    });
  }

  rellenarConDatosDePrueba() {
    // vamos a introducir unos datos de ejemplo
    this.nombre.setValue('Carlos Alberto');
    this.apellidos.setValue('Godoy San José');
    this.cPostal.setValue(12006);
    this.domicilio.setValue('Vicente Sos Baynat 25 3º B');
    this.getpais.setValue('España');
    this.getprov.setValue('Castellón');
    this.mail.setValue('carlosag31@hotmail.com');
    this.tel.setValue(644312172);
    this.password.setValue('1aB/godo');
    this.confirmPassword.setValue('1aB/godo');
  }
  rellenarFormulario() {
    this.userForm = this.fb.group({
      nombre: [this.user.nombre, [Validators.required, Validators.pattern(this.unamePattern)]],
      apellidos: [this.user.apellidos, Validators.required],
      pais: [this.user.pais],
      provincia: [this.user.provincia],
      domicilio: [this.user.domicilio],
      cPostal: [this.user.cPostal , Validators.pattern(this.patroncodigopostal)],
      mail: [this.user.mail, [Validators.required, Validators.pattern(this.patronemail)]],
      tel: [this.user.tel, Validators.pattern(this.patrontelefono)],
      repasswords: this.fb.group({
        password: [this.user.password, Validators.pattern(this.patronpassword)],
        confirmPassword: [this.user.password]},
        { validator: passwordDiferenteValidator }),
      // 'repasswords': this.fb.group({'password': [''], 'confirmPassword': ['']}, { validator: PasswordValidation.MatchPassword }),
    });
  }
}
