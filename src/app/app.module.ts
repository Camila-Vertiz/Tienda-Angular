import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { AppComponent } from './app.component';
import { HomeComponent } from '../app/modules/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from '../app/modules/menu/menu.component';
import { LoginComponent } from '../app/modules/login/login.component';

import { FooterComponent } from '../app/modules/footer/footer.component';

import { CarritoComponent } from '../app/modules/carrito/carrito.component';
import { CasesComponent } from '../app/modules/cases/cases.component';
import { CelularesComponent } from '../app/modules/celulares/celulares.component';
import { ComprasComponent } from '../app/modules/compras/compras.component';
import { DetalleCompraComponent } from '../app/modules/detalleCompra/detalleCompra.component';
import { OrdenComponent } from '../app/modules/orden/orden.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { SignUpComponent } from '../app/modules/sign-up/sign-up.component';
import { CustomPsmServiceService } from '../app/modules/sign-up/custom-psm-service.service';
import { UsuariosComponent } from '../app/modules/usuarios/usuarios.component';
import { CategoriaComponent } from '../app/modules/categoria/categoria.component';
import { ProductoComponent } from '../app/modules/producto/producto.component';
import { MostrarProductosComponent } from '../app/modules/mostrar-productos/mostrar-productos.component';
import { DetalleProductoComponent } from '../app/modules/detalle-producto/detalle-producto.component';
import { ResumenOrdenesComponent } from '../app/modules/resumen-ordenes/resumen-ordenes.component';
import { ResumenDetalleOrdenComponent } from '../app/modules/resumen-detalle-orden/resumen-detalle-orden.component';
import { ReporteComponent } from '../app/modules/reporte/reporte.component';
import { AuthGuardUser, AuthGuardAdmi } from './core';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuardUser]},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'cases', component: CasesComponent},
  { path: 'celulares', component: CelularesComponent},
  { path: 'compras', component: ComprasComponent, canActivate: [AuthGuardUser]},
  { path: 'detalle-compra', component: DetalleCompraComponent,canActivate: [AuthGuardUser]},
  { path: 'producto', component: ProductoComponent, canActivate: [AuthGuardAdmi]},
  { path: 'orden', component: OrdenComponent,},
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuardAdmi]},
  { path: 'categoria', component: CategoriaComponent, canActivate: [AuthGuardAdmi]},
  { path: 'mostrar-productos', component: MostrarProductosComponent,canActivate: [AuthGuardAdmi]},
  { path: 'detalle-producto', component: DetalleProductoComponent,canActivate: [AuthGuardUser]},
  { path: 'resumen-ordenes', component: ResumenOrdenesComponent, canActivate: [AuthGuardAdmi]},
  { path: 'resumen-detalle-orden', component: ResumenDetalleOrdenComponent, canActivate: [AuthGuardAdmi]},
  { path: 'reporte', component: ReporteComponent, canActivate: [AuthGuardAdmi]},
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
