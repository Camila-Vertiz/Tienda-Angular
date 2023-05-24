import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciosapiService } from '../servicio-api.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  myForm: FormGroup;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    private apiService: ServiciosapiService
  ) {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login() {
    const user = { email: this.myForm.value.email, password: this.myForm.value.password };
    console.log(user);
    this.apiService.login(user)
    .then(data => {
      //console.log(JSON.stringify(data));
      const jsonRespuesta = JSON.stringify(data);
      console.log("jsonRespuesta: "+jsonRespuesta);
      const Respuesta = JSON.parse(jsonRespuesta);
      var id_user = Respuesta[0].idusuario;
      var indice = Respuesta[0].ind_usuario;
      console.log("idusuario: "+id_user);
      console.log("indice: "+indice);

      if (indice == 0) {
        console.log('user no existe');
        this.alertaError();
      } else {
        console.log('user existe');
        this.router.navigate(['/home']);
        this.apiService.setUserLoggedIn(true);

        localStorage.setItem('id_user', id_user);

      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  alertaError() {
    Swal.fire({
      icon: 'error',
      title: 'Inicio de Sesión Fallido',
      text: 'Verifica tus credenciales',
    })
  }
}