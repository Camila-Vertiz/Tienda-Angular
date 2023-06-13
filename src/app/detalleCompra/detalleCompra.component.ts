import { Component } from '@angular/core';
import { ServiciosapiService } from '../servicio-api.component';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2'
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-detalleCompra',
  templateUrl: './detalleCompra.component.html',
  styleUrls: ['./detalleCompra.component.scss']
})
export class DetalleCompraComponent {
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

  generarPDF() {
    const DATA = document.getElementById('detalle'); // ID de tu tabla HTML
    if (DATA) {
      html2canvas(DATA).then(canvas => {
        const imgWidth = 208;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
        pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('detalle-compra.pdf');
      });
    }
  }
}