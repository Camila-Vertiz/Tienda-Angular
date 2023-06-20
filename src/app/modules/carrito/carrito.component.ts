import { Component } from '@angular/core';
import { ServiciosapiService } from '../servicio-api.component';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {
  total = 0.00;
  carrito: any[];
  disable = true;

  public item = {
    "id_carrito": 1,
    "id_producto": 1,
    "id_usuario": 1,
    "cantidad": 1,
    "nombre": "",
    "precio": 0.0,
    "total": 0.0,
    "estado": 0
  }

  constructor(
    private apiService: ServiciosapiService,
    public router: Router,
    private route: ActivatedRoute) {

    this.buscarCarritoPorCliente();
  }

  buscarCarritoPorCliente() {
    const id_usuario = localStorage.getItem('id_user');
    this.apiService.buscarCarritoPorCliente(id_usuario)
      .then(data => {
        const jsonRespuesta = JSON.stringify(data);
        const Respuesta = JSON.parse(jsonRespuesta);
        this.carrito = Respuesta;
        this.asc();
        this.calcularTotal();
        this.disableButton();
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

  disableButton() {
    if (this.total <1) {
      this.disable = true;
      console.log("disable: ", this.disable)
    }
    else {
      this.disable = false;
      console.log("disable: ", this.disable)
    }
  }

  alertaBefDelete(item: any) {
    console.log(item);
    this.item = item;
    this.item.estado = 0;
    console.log(this.item);
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.insertarCarrito(this.item)
          .then(data => {
            this.alertaPostDelete();
          }).catch(async er => {
            console.log("error eliminar:" + er);
          });
      }
    });
  }

  alertaPostDelete() {
    Swal.fire({
      title: 'Eliminado',
      text: 'El producto se ha eliminado del carrito con éxito',
      icon: 'success',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }
}