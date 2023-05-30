import { Component } from '@angular/core';
import { ServiciosapiService } from '../servicio-api.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  suscripcion: any;
  email: string ="";
  constructor(private apiService: ServiciosapiService){}
  validarEmail() {
    // Verificar si el formato del correo electrónico es válido
    // Puedes utilizar una expresión regular o una lógica personalizada para validar el formato
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(this.email);
  }

  
  registrar() {
    this.suscripcion = {
      email: this.email,
      
    };
  
  console.log(this.suscripcion);
  this.apiService.insertarSuscripcion(this.suscripcion)
    .then(data => {
    }).catch(async er => {

      console.log("error actualizarPublicidad:" + er);
    });
  }
}
