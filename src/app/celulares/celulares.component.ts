import { Component } from '@angular/core';
import { ServiciosapiService } from '../servicio-api.component';

@Component({
  selector: 'app-celulares',
  templateUrl: './celulares.component.html',
  styleUrls: ['./celulares.component.scss']
})
export class CelularesComponent {
  productos: any[] = [];
  terminoBusqueda = "";

  constructor(
    private apiService: ServiciosapiService) { }

  ngOnInit() {
    this.apiService.listarProductos().subscribe(data => {
      this.productos = data.filter(producto => producto.id_categoria === 1);
    });
    this.productos.sort((a, b) => a.id - b.id);
  }
  getProductosFiltrados(): any[] {
    if (!this.terminoBusqueda) {
      return this.productos;
    }
    const termino = this.terminoBusqueda.toLowerCase();
    return this.productos.filter((producto: any) => {

      const nombres = `${producto.nombre}`.toLowerCase();
      return nombres.includes(termino);
    });
  }

  detalleProducto(producto: any) {
    console.log(producto)
  }
}