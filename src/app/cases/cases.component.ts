import { Component } from '@angular/core';
import { ServiciosapiService } from '../servicio-api.component';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent {
  productos: any[] = [];
  terminoBusqueda = "";

  constructor(
    private router: Router,
    private apiService: ServiciosapiService) { }

  ngOnInit() {
    this.apiService.listarProductos().subscribe(data => {
      this.productos = data.filter(producto => producto.id_categoria === 4);
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
    let extras: NavigationExtras = {
      queryParams: {
        producto: producto
      }
    };
    console.log(producto);
    this.router.navigate(['/detalle-producto'], extras);
  }
}