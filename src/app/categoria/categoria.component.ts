import { Component, ElementRef, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosapiService } from '../servicio-api.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {
  @ViewChild('modalEditar') modalEditar!: ElementRef;

  myForm: FormGroup;
  categorias: any[] = [];
  terminoBusqueda = "";
  nombreCategoria: string = '';
  public Categoria = {
    "id_categoria": 0,
    "nombre": ""
  }

  title="";
  msg="";

  constructor(
    public formBuilder: FormBuilder,
    private apiService: ServiciosapiService) {
    this.myForm = this.formBuilder.group({
      nombre: ['', [Validators.required]]
    });
  }
  ngOnInit() {
    this.apiService.listarCategoria().subscribe(data => {
      this.categorias = data;
    });
  }

  asc() {
    this.categorias.sort((a, b) => a.id_categoria - b.id_categoria);
  }

  desc() {
    this.categorias.sort((a, b) => b.id_categoria - a.id_categoria);
  }

  registrar() {
    const nombre = this.myForm.value.nombre;
    console.log(nombre);
    this.apiService.insertarCategoria(JSON.stringify(nombre))
      .then(data => {
        this.title="Registro exitoso";
        this.msg="Categoría creada con éxito";
        this.alertaSuccess();
      }).catch(async er => {
        console.log("error insertarCategoria:" + er);
      });
  }

  getCategoriasFiltradas(): any[] {
    if (!this.terminoBusqueda) {
      return this.categorias;
    }
    const termino = this.terminoBusqueda.toLowerCase();
    return this.categorias.filter((categoria: any) => {

      const nombres = `${categoria.nombre}`.toLowerCase();
      return nombres.includes(termino);
    });
  }

  alertaSuccess() {
    Swal.fire({
      icon: 'success',
      title: this.title,
      text:  this.msg,
      confirmButtonText: 'OK',
    }).then(() => {
      this.myForm.controls['nombre'].setValue('');
      location.reload();
    });
  }

  abrirModalEditar(id_categoria: number, nombre: string) {
    this.Categoria.id_categoria = id_categoria;
    this.Categoria.nombre = nombre;
    console.log(this.Categoria)
    this.modalEditar.nativeElement.classList.add('show');
    document.body.classList.add('modal-open');
  }

  actualizar() {
    this.Categoria.nombre = this.myForm.value.nombre;
    this.apiService.insertarCategoria(this.Categoria)
      .then(data => {
        this.title="Actualización exitosa";
        this.msg="Categoría acualizada con éxito";
        this.alertaSuccess();
      }).catch(async er => {
        console.log("error insertarCategoria:" + er);
      });
  }
}
