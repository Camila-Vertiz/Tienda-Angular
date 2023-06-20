import { Component } from '@angular/core';
import { ServiciosapiService } from '../servicio-api.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  isLogged = false;
  tipo = "";

  constructor(
    private router: Router,
    private apiService: ServiciosapiService
  ) {
    this.buscarUser();
  }

  ngAfterViewInit() {
    const id_user = localStorage.getItem('id_user');

    if (id_user) {
      this.isLogged = true;
    }
    console.log(this.isLogged);
  }

  buscarUser() {
    const id_user = localStorage.getItem('id_user');
    this.apiService.buscarUsuarioPorId(id_user)
      .then(data => {
        //console.log(JSON.stringify(data));
        const jsonRespuesta = JSON.stringify(data);
        const Respuesta = JSON.parse(jsonRespuesta);
        var tipo = Respuesta[0].tipo;
        this.tipo = tipo;
        console.log(tipo);
      })
      .catch(error => {
        //console.log(error);
      });
  }

  logout() {
    localStorage.clear();
    this.apiService.setUserLoggedIn(false);
    if (this.router.url === '/home') {
      location.reload();
    } else {
      this.router.navigate(['/home']);
    }
  }
}
