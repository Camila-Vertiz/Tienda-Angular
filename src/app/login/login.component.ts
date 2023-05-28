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
  intentos = 3;
  mensaje = "";
  tiempoRestante = 15;
  n = 15;
  desactivarBoton = false;

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
  ngOnInit() {

  }

  contador() {
    let that = this;
    window.setInterval(function () {

      if (that.tiempoRestante == 0) {
        that.desactivarBoton = false;
      } else {
        that.tiempoRestante = that.n;
        that.n--;
      }

    }, 1000);
  }

  login() {
    const user = { email: this.myForm.value.email, password: this.myForm.value.password };
    console.log(user);
    this.apiService.login(user)
      .then(data => {
        //console.log(JSON.stringify(data));
        const jsonRespuesta = JSON.stringify(data);
        console.log("jsonRespuesta: " + jsonRespuesta);
        const Respuesta = JSON.parse(jsonRespuesta);
        var id_user = Respuesta[0].idusuario;
        var indice = Respuesta[0].ind_usuario;
        console.log("idusuario: " + id_user);
        console.log("indice: " + indice);

        if (indice == 0) {
          console.log('user no existe');
          this.intentos--;

          if (this.intentos == 0) {
            this.mensaje = "Tu cuenta ha sido bloqueada. Espera 15 segundos antes de volver a intentarlo."
            this.n = 15;
            this.tiempoRestante = 15;
            this.desactivarBoton = true;
            this.contador();
          } else {
            this.mensaje = 'Verifica tus credenciales. Te quedan ' + this.intentos + ' intentos restantes.';
          }
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
      text: this.mensaje,
    })
  }


}