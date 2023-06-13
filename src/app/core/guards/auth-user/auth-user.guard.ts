import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ServiciosapiService } from '../../../modules/servicio-api.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardUser implements CanActivate {
  constructor(
    private readonly router: Router,
    private apiService: ServiciosapiService
  ) { }

  flag: any;

  public async canActivate(): Promise<boolean> {
    const user = localStorage.getItem('id_user');
    if (user) {
      await this.buscarUser();
      console.log(this.flag);
      if (this.flag == 1) {
        console.log("a");
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }

  async buscarUser() {
    const id_user = localStorage.getItem('id_user');
    try {
      const data = await this.apiService.buscarUsuarioPorId(id_user);
      const jsonRespuesta = JSON.stringify(data);
      const Respuesta = JSON.parse(jsonRespuesta);
      var tipo = Respuesta[0].tipo;
      if (tipo === "USER") {
        console.log("USER");
        this.flag = 1;
        console.log(this.flag);
      } else {
        this.flag = 0;
      }
    } catch (error) {
      // Handle error
    }
  }
}
