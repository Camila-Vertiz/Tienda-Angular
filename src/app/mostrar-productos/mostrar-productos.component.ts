import { Component } from '@angular/core';
import { ServiciosapiService } from '../servicio-api.component';

@Component({
  selector: 'app-mostrar-productos',
  templateUrl: './mostrar-productos.component.html',
  styleUrls: ['./mostrar-productos.component.scss']
})
export class MostrarProductosComponent {
  productos: any[] = [];
  terminoBusqueda = "";

  constructor(
    private apiService: ServiciosapiService) { }

  ngOnInit() {
    this.apiService.listarProductos().subscribe(data => {
      this.productos = data;
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
}
