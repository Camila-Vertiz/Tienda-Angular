import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciosapiService } from '../servicio-api.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-singUp',
  templateUrl: './singUp.component.html',
  styleUrls: ['./singUp.component.scss']
})
export class SingUpComponent {
  myForm: FormGroup;
  valido = false;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    private apiService: ServiciosapiService
  ) {
    this.myForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]],
      telefono: ['', [Validators.required, Validators.minLength(9)]],
      direccion: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      distrito: ['', [Validators.required]],
      zip: ['', [Validators.required]]
    });
  }

  passwordStrengthValidator(control: any) {
    console.log("control: " + control);
    const value = control;
    console.log("value: " + value);
    const hasUpperCase = /[A-Z]/.test(value);
    console.log("hasUpperCase: " + hasUpperCase);
    const hasLowerCase = /[a-z]/.test(value);
    console.log("hasLowerCase: " + hasLowerCase);
    const hasNumeric = /[0-9]/.test(value);
    console.log("hasNumeric: " + hasNumeric);
    const hasSpecialChar = /[!@#$%^&*_-]/.test(value);
    console.log("hasSpecialChar: " + hasSpecialChar);

    let isPasswordValid = false;


    if (hasUpperCase &&
      hasLowerCase &&
      hasNumeric &&
      hasSpecialChar &&
      value.length >= 8) {
      isPasswordValid = true;
    }

    console.log("isPasswordValid: " + isPasswordValid);
    let iguales = false;

    if (this.myForm.value.password == this.myForm.value.password2) {
      iguales = true;
    }
    console.log("iguales: " + iguales);


    if (isPasswordValid && iguales) {
      this.valido = true;
    }
    else {
      this.valido = false;

    }
  }

  signup() {
    const pass = this.myForm.value.password;
    console.log("pass: " + pass);
    this.passwordStrengthValidator(pass);
    console.log("this.valido: " + this.valido);
    if (this.valido) {

    } else {
      this.alertaError();
    }
  }

  alertaError() {
    Swal.fire({
      icon: 'error',
      title: 'Registro fallido',
      text: 'Verifica que tu contraseña sea segura y coincida con la confirmación',
    })
  }

  alertaSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: 'Usuario creado con éxito',
      confirmButtonText: 'OK',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['/home']);
      }
    });
  }
}