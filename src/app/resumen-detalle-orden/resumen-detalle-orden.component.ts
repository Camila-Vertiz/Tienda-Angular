import { Component } from '@angular/core';
import { ServiciosapiService } from '../servicio-api.component';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-resumen-detalle-orden',
  templateUrl: './resumen-detalle-orden.component.html',
  styleUrls: ['./resumen-detalle-orden.component.scss']
})
export class ResumenDetalleOrdenComponent {
  id_orden: number;
  detalle: any[];

  constructor(
    private apiService: ServiciosapiService,
    public router: Router,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id_orden = params['id_orden'];
    });

    console.log(this.id_orden);
    this.listarDetallePorOrden();
  }

  listarDetallePorOrden() {
    this.apiService.listarDetallePorOrden(this.id_orden)
      .then((res) => {
        const jsonRespuesta = JSON.stringify(res);
        const Respuesta = JSON.parse(jsonRespuesta);
        this.detalle = Respuesta;
        console.log(this.detalle);

      }).catch(async er => {
        console.log("error buscarPorId:" + er);
      });
  }
}