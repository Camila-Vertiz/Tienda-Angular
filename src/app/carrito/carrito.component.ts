import { Component } from '@angular/core';
import { ServiciosapiService } from '../servicio-api.component';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {
  idproducto:any;
  nombre:any;
  precio:any;
  cantidad:any;
  total:any;
  carrito:any[];

  constructor(
    private apiService: ServiciosapiService,
    public router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id_usuario = localStorage.getItem('id_user');
   
    this.apiService.buscarCarritoPorCliente(id_usuario)
      .then(data => {
        const jsonRespuesta = JSON.stringify(data);
        const Respuesta = JSON.parse(jsonRespuesta);
       this.carrito = Respuesta;
        console.log( this.carrito);
      })
      .catch(error => {
        console.log(error);
      });
    this.asc();
    console.log(this.carrito)
  }
  asc() {
    this.carrito.sort((a, b) => a.id_carrito - b.id_carrito);
  }
}