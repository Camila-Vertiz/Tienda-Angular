import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

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
import { OrdenComponent } from './orden/orden.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CustomPsmServiceService } from './sign-up/custom-psm-service.service';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ProductoComponent } from './producto/producto.component';
import { MostrarProductosComponent } from './mostrar-productos/mostrar-productos.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { ResumenOrdenesComponent } from './resumen-ordenes/resumen-ordenes.component';
import { ResumenDetalleOrdenComponent } from './resumen-detalle-orden/resumen-detalle-orden.component';
import { ReporteComponent } from './reporte/reporte.component';

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
  { path: 'producto', component: ProductoComponent},
  { path: 'orden', component: OrdenComponent},
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'categoria', component: CategoriaComponent},
  { path: 'mostrar-productos', component: MostrarProductosComponent},
  { path: 'detalle-producto', component: DetalleProductoComponent},
  { path: 'resumen-ordenes', component: ResumenOrdenesComponent},
  { path: 'resumen-detalle-orden', component: ResumenDetalleOrdenComponent},
  { path: 'reporte', component: ReporteComponent},
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
    OrdenComponent,
    MenuComponent,
    UsuariosComponent,
    CategoriaComponent,
    ProductoComponent,
    MostrarProductosComponent,
    DetalleProductoComponent,
    ResumenOrdenesComponent,
    ResumenDetalleOrdenComponent,
    ReporteComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    PasswordStrengthMeterModule.forRoot({ serviceClass: CustomPsmServiceService }),
    // PasswordStrengthMeterModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
