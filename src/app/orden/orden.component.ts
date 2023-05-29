import { Component } from '@angular/core';
import { ServiciosapiService } from '../servicio-api.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.scss']
})
export class OrdenComponent {

  cliente: any;

  constructor(
    private router: Router,
    private apiService: ServiciosapiService
  ) {
    this.buscarUser();
  }

  buscarUser() {
    const id_user = localStorage.getItem('id_user');
    this.apiService.buscarUsuarioPorId(id_user)
      .then(data => {
        console.log(JSON.stringify(data));
        const jsonRespuesta = JSON.stringify(data);
        const Respuesta = JSON.parse(jsonRespuesta);
        this.cliente = Respuesta[0];
        console.log(this.cliente);
      })
      .catch(error => {
        //console.log(error);
      });
  }

}