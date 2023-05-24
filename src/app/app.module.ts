import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { SingUpComponent } from './singUp/singUp.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CasesComponent } from './cases/cases.component';
import { CelularesComponent } from './celulares/celulares.component';
import { ComprasComponent } from './compras/compras.component';
import { DetalleCompraComponent } from './detalleCompra/detalleCompra.component';
import { ProductoHomeComponent } from './productoHome/productoHome.component';
import { ResumenOrdenComponent } from './resumenOrden/resumenOrden.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CarritoComponent,
    SingUpComponent,
    CasesComponent,
    CelularesComponent,
    ComprasComponent,
    DetalleCompraComponent,
    ProductoHomeComponent,
    ResumenOrdenComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
