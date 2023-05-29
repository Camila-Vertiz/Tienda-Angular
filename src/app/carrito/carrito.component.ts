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

  constructor(
    private apiService: ServiciosapiService,
    public router: Router,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.idproducto = params['idproducto'];
      this.nombre = params['nombre'];
      this.precio = params['precio'];
      this.cantidad = params['cantidad'];
    });

    this.total=this.precio*this.cantidad;

    console.log(this.idproducto);
    console.log(this.nombre);
    console.log(this.precio);
    console.log(this.cantidad);
    console.log(this.total);
  }
}