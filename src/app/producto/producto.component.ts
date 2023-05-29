import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosapiService } from '../servicio-api.component';
import Swal from 'sweetalert2'
import { finalize } from 'rxjs';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {
  @ViewChild('modalEditar') modalEditar!: ElementRef;
  @ViewChild('mySelect') mySelect: any;

  myForm: FormGroup;
  myFormAct: FormGroup;
  productos: any[] = [];
  terminoBusqueda = "";
  nombreProducto: string = '';
  idUsuario: any;
  public nuevoProducto = {
    "nombre": "",
    "id_categoria": 1,
    "descripcion": "",
    "cantidad": 10,
    "precio": 0.0,
    "imagen": "",
    "id_usuario": 1,
  }

  public actualizarProducto = {
    "id": 1,
    "nombre": "",
    "id_categoria": 1,
    "descripcion": "",
    "cantidad": 10,
    "precio": 0.0,
    "imagen": "",
    "id_usuario": 1,
  }

  title = "";
  msg = "";

  selectedOption: any;
  options: any[] = [];
  categoria: any;
  selectedFile: File | null = null;
  urlImagen: string = "";
  downloadURL: string | null = null;
  imagenSubida: number = 0;
  subido = true;

  nombre: any;
  id_categoria: any;
  descripcion: any;
  cantidad: any;
  precio: any;
  id_usuario: any;
  imagen: any;

  constructor(
    private storage: AngularFireStorage,
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
    this.buscarUser();

    this.myFormAct = this.formBuilder.group({
      nombre: [''],
      categoria: [''],
      descripcion: [''],
      cantidad: [''],
      precio: [''],
      imagen: ['']
    });
    this.cargarCategoriasActualizar();
  }
  ngOnInit() {
    this.apiService.listarProductos().subscribe(data => {
      this.productos = data;
    });
  }

  buscarUser() {
    const id_user = localStorage.getItem('id_user');
    this.apiService.buscarUsuarioPorId(id_user)
      .then(data => {
        //console.log(JSON.stringify(data));
        const jsonRespuesta = JSON.stringify(data);
        const Respuesta = JSON.parse(jsonRespuesta);
        var idUsuario = Respuesta[0].id_usuario;
        this.idUsuario = idUsuario;
        console.log(idUsuario);
      })
      .catch(error => {
        //console.log(error);
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

  cargarCategorias() {
    this.apiService.listarCategoria().subscribe(res => {
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

  cargarCategoriasActualizar() {
    this.apiService.listarCategoria().subscribe(res => {
      console.log(res);
      const select1 = document.getElementById('mySelect1');
      if (select1) {
        res.forEach(option1 => {
          const optionElement = document.createElement('option');
          optionElement.value = option1.id_categoria;
          optionElement.textContent = option1.nombre;
          select1?.appendChild(optionElement);
        });
      }
    });
  }

  onSelectChange(event: any) {
    this.selectedOption = event.target.value;
    this.categoria = this.selectedOption;
    console.log('Selected option:', this.selectedOption);
  }
  onFileSelected(event: any) {
    this.subido = false;
    this.selectedFile = event.target.files[0]; // Obtén el primer archivo seleccionado
    this.onUpload();
  }

  onUpload() {
    if (this.selectedFile) {
      const filePath = 'assets/producto/' + this.selectedFile.name;
      this.nuevoProducto.imagen = filePath;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.selectedFile);
      console.log(filePath);

      // Obtenemos la URL de descarga cuando la carga se completa
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            console.log(url);
            this.downloadURL = url;
            this.urlImagen = url;
            this.imagenSubida = 1;
            this.subido = true;
          });
        })
      ).subscribe();
    }
  }

  registrar() {
    this.nuevoProducto.nombre = this.myForm.value.nombre;
    this.nuevoProducto.id_categoria = this.myForm.value.categoria;
    this.nuevoProducto.descripcion = this.myForm.value.descripcion;
    this.nuevoProducto.cantidad = this.myForm.value.cantidad;
    this.nuevoProducto.precio = this.myForm.value.precio;
    this.nuevoProducto.id_usuario = this.idUsuario;

    console.log(this.nuevoProducto);

    this.apiService.insertarProducto(this.nuevoProducto)
      .then(data => {
        this.title = "Registro exitoso";
        this.msg = "Producto creado con éxito";
        this.alertaSuccess();
      }).catch(async er => {
        console.log("error insertarCategoria:" + er);
      });
  }

  alertaSuccess() {
    Swal.fire({
      icon: 'success',
      title: this.title,
      text: this.msg,
      confirmButtonText: 'OK',
    }).then(() => {
      this.myForm.controls['nombre'].setValue('');
      this.myForm.controls['categoria'].setValue('');
      this.myForm.controls['descripcion'].setValue('');
      this.myForm.controls['cantidad'].setValue('');
      this.myForm.controls['precio'].setValue('');
      location.reload();
    });
  }

  abrirModalEditar(id: number, nombre: string, descripcion: string,
    cantidad: number, precio: number, id_categoria: number, imagen: string, id_usuario: number) {

    this.actualizarProducto.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.cantidad = cantidad;
    this.precio = precio;
    this.id_categoria = id_categoria;
    this.id_usuario = id_usuario;
    this.imagen = imagen;


    this.modalEditar.nativeElement.classList.add('show');
    document.body.classList.add('modal-open');
  }

  actualizar() {
    console.log(this.actualizarProducto);
    if (this.imagenSubida == 1) {
      this.actualizarProducto.nombre = this.nombre;
      this.actualizarProducto.descripcion = this.descripcion;
      this.actualizarProducto.cantidad = this.cantidad;
      this.actualizarProducto.precio = this.precio;
      this.actualizarProducto.id_categoria = this.id_categoria;
      this.actualizarProducto.id_usuario = this.id_usuario;
      this.actualizarProducto.imagen = this.urlImagen;
    }
    else {
      this.actualizarProducto.nombre = this.nombre;
      this.actualizarProducto.descripcion = this.descripcion;
      this.actualizarProducto.cantidad = this.cantidad;
      this.actualizarProducto.precio = this.precio;
      this.actualizarProducto.id_categoria = this.id_categoria;
      this.actualizarProducto.id_usuario = this.id_usuario;
      this.actualizarProducto.imagen = this.imagen;
    }
    // this.actualizarProducto.imagen = this.imagen;
    console.log(this.actualizarProducto);

    this.apiService.insertarProducto(this.actualizarProducto)
      .then(data => {
        this.title = "Actualización exitosa";
        this.msg = "Producto acualizado con éxito";
        this.alertaSuccess();
      }).catch(async er => {
        console.log("error insertarProducto:" + er);
      });
  }

  alertaBefDelete(id: number) {
    console.log(id)
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.eliminarProducto(id)
          .then(data => {
            this.alertaPostDelete();
          }).catch(async er => {
          });
      }
    });
  }

  alertaPostDelete() {
    Swal.fire({
      title: 'Eliminado',
      text: 'El producto se ha eliminado con éxito',
      icon: 'success',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }
}

