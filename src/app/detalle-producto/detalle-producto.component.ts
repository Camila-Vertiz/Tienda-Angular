import { Component } from '@angular/core';
import { ServiciosapiService } from '../servicio-api.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent {

  idProducto: any;
  producto: any;

  constructor(
    private apiService: ServiciosapiService,
    public router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder) {
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
        console.log(res);
        const jsonRespuesta = JSON.stringify(res);
        const Respuesta = JSON.parse(jsonRespuesta);
        this.producto = Respuesta[0];
        console.log(this.producto);

      }).catch(async er => {
        console.log("error buscarPorId:" + er);
      });

  }
}
