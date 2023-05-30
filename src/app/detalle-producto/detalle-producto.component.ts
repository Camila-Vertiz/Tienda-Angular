import { Component } from '@angular/core';
import { ServiciosapiService } from '../servicio-api.component';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent {

  idProducto: any;
  producto: any;
  cantidad = 1;
  existe = true;

  public carrito = {
    "id_producto": 1,
    "id_usuario": 1,
    "cantidad": 1,
    "nombre": "",
    "precio": 0.0,
    "total": 0.0,
    "estado": 1
  }

  constructor(
    private apiService: ServiciosapiService,
    public router: Router,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.idProducto = params['idproducto'];
    });

    console.log(this.idProducto);
  }

  ngOnInit(): void {
    this.buscarPorId();
  }

  buscarPorId() {
    const id = this.idProducto;

    this.apiService.buscarProductoPorId(id)
      .then((res) => {
        const jsonRespuesta = JSON.stringify(res);
        const Respuesta = JSON.parse(jsonRespuesta);
        this.producto = Respuesta[0];
        console.log(this.producto);

      }).catch(async er => {
        console.log("error buscarPorId:" + er);
      });
  }

  // async setCart() {
  //   await this.verificarProductoExiste();
  //   if (this.existe) {
  //     console.log("producto duplicado");
  //     this.alertaError();
  //   }
  //   else {
  //     const id = localStorage.getItem('id_user');
  //     if (id) {
  //       let id_usuario = parseInt(id);
  //       this.carrito.id_usuario = id_usuario;
  //     }
  //     this.carrito.cantidad = this.cantidad;
  //     this.carrito.nombre = this.producto.nombre;
  //     this.carrito.precio = this.producto.precio;
  //     this.carrito.total = this.cantidad * this.producto.precio;
  //     this.carrito.id_producto = this.producto.id_producto;

  //     console.log(this.carrito);

  //     this.apiService.insertarCarrito(this.carrito)
  //       .then(data => {
  //         this.alertaSuccess();
  //       }).catch(async er => {
  //         console.log("error insertarCategoria:" + er);
  //       });
  //   }
  // }

  setCart() {
    const id_usuario = localStorage.getItem('id_user');
    const carrito = {
      "id_producto": this.idProducto,
      "id_usuario": id_usuario
    }
    console.log(carrito);

    this.apiService.verificarProductoExiste(carrito)
      .then((res) => {
        const jsonRespuesta = JSON.stringify(res);
        const Respuesta = JSON.parse(jsonRespuesta);
        let flag = Respuesta[0].ind_producto;
        if (flag == 0) {
          const id = localStorage.getItem('id_user');
          if (id) {
            let id_usuario = parseInt(id);
            this.carrito.id_usuario = id_usuario;
          }
          this.carrito.cantidad = this.cantidad;
          this.carrito.nombre = this.producto.nombre;
          this.carrito.precio = this.producto.precio;
          this.carrito.total = this.cantidad * this.producto.precio;
          this.carrito.id_producto = this.producto.id_producto;

          console.log(this.carrito);

          this.apiService.insertarCarrito(this.carrito)
            .then(data => {
              this.alertaSuccess();
            }).catch(async er => {
              console.log("error insertarCategoria:" + er);
            });
        }
        else {
          this.alertaError();
        }
        console.log(this.existe);

      }).catch(async er => {
        console.log("error buscarPorId:" + er);
      });
  }

  alertaSuccess() {
    Swal.fire({
      icon: 'success',
      title: "Registro exitoso",
      text: "Producto agregado al carrito con éxito",
      confirmButtonText: 'OK',
    }).then(() => {
      this.router.navigate(['/carrito']);
    });
  }

  alertaError() {
    Swal.fire({
      icon: 'error',
      title: 'Producto duplicado',
      text: 'Ya se ha agregado este producto en su carrito. Realice la compra.',
    })
  }

}
