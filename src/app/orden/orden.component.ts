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
  ordenes: any[];
  numero = 0;
  numeroConcatenado = "";

  constructor(
    private router: Router,
    private apiService: ServiciosapiService
  ) {
    this.buscarUser();
    this.buscarCarritoPorCliente();
    this.listarOrden();
  }

  listarOrden() {
    this.apiService.listarOrden().subscribe(data => {
      this.ordenes = data;
      console.log(this.ordenes);
      this.maxNumero();
    });
  }
  maxNumero() {
    if (this.ordenes.length === 0) {
      this.numero = 1;
    } else {
      this.numero = this.ordenes.reduce((max, orden) => {
        return orden.numero > max ? orden.numero : max;
      }, this.ordenes[0].numero);
      this.numero++;
    }

    if (this.numero < 10) {
      this.numeroConcatenado = "000000000" + (this.numero);
    } else if (this.numero < 100) {
      this.numeroConcatenado = "00000000" + (this.numero);
    } else if (this.numero < 1000) {
      this.numeroConcatenado = "0000000" + (this.numero);
    } else if (this.numero < 10000) {
      this.numeroConcatenado = "000000" + (this.numero);
    }

    console.log("El máximo número de orden es:", this.numero);
    console.log("numeroConcatenado:", this.numeroConcatenado);
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

  insertarOrden() {
    this.apiService.insertarOrden(this.carrito)
      .then(data => {
        // this.alertaSuccess();
      }).catch(async er => {
        console.log("error insertarCategoria:" + er);
      });
  }

}