import { Component } from '@angular/core';
import { ServiciosapiService } from '../servicio-api.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  clientes: any[] = [];

  constructor(private apiService: ServiciosapiService) { 

  }
  ngOnInit(){
    this.apiService.listarClientes().subscribe(data => {
      this.clientes = data;
    });
  }
}
