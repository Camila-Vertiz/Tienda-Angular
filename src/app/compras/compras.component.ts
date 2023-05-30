import { Component } from '@angular/core';
import { ServiciosapiService } from '../servicio-api.component';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})

export class ComprasComponent {

  ordenes: any[];

  constructor(
    private router: Router,
    private apiService: ServiciosapiService
  ) {
    this.listarOrden();
  }

  listarOrden() {
    const id_usuario = localStorage.getItem('id_user');
    console.log(id_usuario)
    this.apiService.buscarOrdenPorCliente(id_usuario)
      .then(data => {
        const jsonRespuesta = JSON.stringify(data);
        const Respuesta = JSON.parse(jsonRespuesta);
        this.ordenes = Respuesta;
        this.asc();
        console.log(this.ordenes);
      })
      .catch(error => {
        console.log(error);
      });
  }

  asc() {
    this.ordenes.sort((a, b) => a.id_orden - b.id_orden);
  }

  verDetalle(id_orden:number){
    let extras: NavigationExtras = {
      queryParams: {
        id_orden: id_orden
      }
    };
    console.log(id_orden);
    this.router.navigate(['/detalle-compra'], extras);
  }
}