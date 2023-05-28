import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';

import { FooterComponent } from './footer/footer.component';

import { CarritoComponent } from './carrito/carrito.component';
import { CasesComponent } from './cases/cases.component';
import { CelularesComponent } from './celulares/celulares.component';
import { ComprasComponent } from './compras/compras.component';
import { DetalleCompraComponent } from './detalleCompra/detalleCompra.component';
import { ProductoHomeComponent } from './productoHome/productoHome.component';
import { ResumenOrdenComponent } from './resumenOrden/resumenOrden.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CustomPsmServiceService } from './sign-up/custom-psm-service.service';
import { UsuariosComponent } from './usuarios/usuarios.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'carrito', component: CarritoComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'cases', component: CasesComponent},
  { path: 'celulares', component: CelularesComponent},
  { path: 'compras', component: ComprasComponent},
  { path: 'detalle-compra', component: DetalleCompraComponent},
  { path: 'producto', component: ProductoHomeComponent},
  { path: 'resumen', component: ResumenOrdenComponent},
  { path: 'usuarios', component: UsuariosComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CarritoComponent,
    SignUpComponent,

    MenuComponent,
    FooterComponent,

    CasesComponent,
    CelularesComponent,
    ComprasComponent,
    DetalleCompraComponent,
    ProductoHomeComponent,
    ResumenOrdenComponent,
    MenuComponent,
    UsuariosComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    PasswordStrengthMeterModule.forRoot({ serviceClass: CustomPsmServiceService }),
    // PasswordStrengthMeterModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
