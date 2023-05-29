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
  @ViewChild('mySelect') mySelect: any;

  myForm: FormGroup;
  productos: any[] = [];
  terminoBusqueda = "";
  nombreProducto: string = '';
  public nuevoProducto = {
    "nombre": "",
    "categoria": "",
    "descripcion": "",
    "cantidad": 10,
    "precio": 0.0,
    "imagen": "",
  }

  title = "";
  msg = "";

  selectedOption: any;
  options: any[] = [];
  categoria:any;

  constructor(
    public formBuilder: FormBuilder,
    private apiService: ServiciosapiService) {
    this.myForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
    });
    this.cargarCategorias();
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

  cargarCategorias(){
    this.apiService.listarCategoria().subscribe(res=>{
      console.log(res);
      const select = document.getElementById('mySelect');
      if (select) {
        res.forEach(option => {
          const optionElement = document.createElement('option');
          optionElement.value = option.id_categoria;
          optionElement.textContent = option.nombre;
          select?.appendChild(optionElement);
        });
      }
    });
  }

  onSelectChange(event: any) {
    this.selectedOption = event.target.value;
    this.categoria = this.selectedOption;
     console.log('Selected option:', this.selectedOption);
  }

  registrar(){
    this.nuevoProducto.nombre=this.myForm.value.nombre;
    this.nuevoProducto.categoria=this.myForm.value.categoria;
    this.nuevoProducto.descripcion=this.myForm.value.descripcion;
    this.nuevoProducto.cantidad=this.myForm.value.cantidad;
    this.nuevoProducto.precio=this.myForm.value.precio;
    this.nuevoProducto.imagen=this.myForm.value.imagen;

    console.log(this.nuevoProducto)
  }
}
