import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosapiService } from '../servicio-api.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {
  myForm: FormGroup;
  categorias: any[] = [];

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

  asc(){
    this.categorias.sort((a, b) => a.id_categoria - b.id_categoria);
  }

  desc(){
    this.categorias.sort((a, b) => b.id_categoria - a.id_categoria);
  }

  registrar() {
    const nombre=this.myForm.value.nombre;
    console.log(nombre);
    this.apiService.insertarCategoria(JSON.stringify(nombre))
      .then(data => {
        this.alertaSuccess();
      }).catch(async er => {
        console.log("error insertarCategoria:" + er);
      });
  }

  alertaSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: 'Categoría creada con éxito',
      confirmButtonText: 'OK',
    }).then(() => {
      this.myForm.controls['nombre'].setValue('');
    });
  }
}
