import { Component, ElementRef, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosapiService } from '../servicio-api.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {
  @ViewChild('modalEditar') modalEditar!: ElementRef;

  myForm: FormGroup;
  productos: any[] = [];
  terminoBusqueda = "";
  nombreProducto: string = '';
  public Producto = {
    "id_producto": 0,
    "nombre": ""
  }

  title = "";
  msg = "";

  constructor(
    public formBuilder: FormBuilder,
    private apiService: ServiciosapiService) {
    this.myForm = this.formBuilder.group({
      nombre: ['', [Validators.required]]
    });
  }
  ngOnInit() {
    this.apiService.listarProductos().subscribe(data => {
      this.productos = data;
    });
  }

  asc() {
    this.productos.sort((a, b) => a.id - b.id);
  }

  desc() {
    this.productos.sort((a, b) => b.id - a.id);
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
