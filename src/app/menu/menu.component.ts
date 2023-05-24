import { Component } from '@angular/core';
import { ServiciosapiService } from '../servicio-api.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  isLogged = false;

  constructor(
    private apiService: ServiciosapiService
  ) {

  }

  ngAfterViewInit() {
    const id_user = localStorage.getItem('id_user');

    if (id_user) {
      this.isLogged = true;
    }
    console.log(this.isLogged);
  }


}
