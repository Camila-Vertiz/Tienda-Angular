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
  carrito: any[];
  total: any;

  constructor(
    private router: Router,
    private apiService: ServiciosapiService
  ) {
    this.buscarUser();
    this.buscarCarritoPorCliente();

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

  buscarCarritoPorCliente() {
    const id_usuario = localStorage.getItem('id_user');
    this.apiService.buscarCarritoPorCliente(id_usuario)
      .then(data => {
        const jsonRespuesta = JSON.stringify(data);
        const Respuesta = JSON.parse(jsonRespuesta);
        this.carrito = Respuesta;
        console.log(this.carrito);
        this.asc();
        this.calcularTotal();
      })
      .catch(error => {
        console.log(error);
      });
  }


  asc() {
    this.carrito.sort((a, b) => a.id_carrito - b.id_carrito);
  }

  calcularTotal() {
    this.total = this.carrito.reduce((accumulator, element) => accumulator + element.total, 0);
  }

}