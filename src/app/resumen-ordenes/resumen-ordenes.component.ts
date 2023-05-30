import { Component } from '@angular/core';
import { ServiciosapiService } from '../servicio-api.component';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-resumen-ordenes',
  templateUrl: './resumen-ordenes.component.html',
  styleUrls: ['./resumen-ordenes.component.scss']
})
export class ResumenOrdenesComponent {

  ordenes: any[];
  total: any;
  cant: any;
  terminoBusqueda = "";

  constructor(
    private router: Router,
    private apiService: ServiciosapiService) {
  }

  ngOnInit() {
    this.apiService.listarOrden().subscribe(data => {
      this.ordenes = data;
      this.actualizarFecha();
      this.calcularTotal();
      this.cant = this.ordenes.length;
    });
  }

  asc() {
    this.ordenes.sort((a, b) => a.id_orden - b.id_orden);
  }

  desc() {
    this.ordenes.sort((a, b) => b.id_orden - a.id_orden);
  }

  getOrdenesFiltrados(): any[] {
    if (!this.terminoBusqueda) {
      return this.ordenes;
    }
    const termino = this.terminoBusqueda.toLowerCase();
    return this.ordenes.filter((orden: any) => {

      const numero = `${orden.numero}`.toLowerCase();
      return numero.includes(termino);
    });
  }

  actualizarFecha() {
    this.ordenes.forEach(item => {
      item.fechaCreacion = item.fechaCreacion.split("T")[0];
    });
    console.log(this.ordenes);
  }

  calcularTotal() {
    this.total = this.ordenes.reduce((accumulator, element) => accumulator + element.total, 0);
  }

  verDetalle(id_orden: number) {
    let extras: NavigationExtras = {
      queryParams: {
        id_orden: id_orden
      }
    };
    console.log(id_orden);
    this.router.navigate(['/resumen-detalle-orden'], extras);
  }
}
