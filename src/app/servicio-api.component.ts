import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ServiciosapiService {
    //  app.ecobus.com
    url: string = "http://localhost:8090/api";


    private userLoggedIn = new Subject<boolean>();

    private options: any = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }) };
    constructor(private http: HttpClient) { }

    listarClientes() {
        return this.http.get<any[]>(this.url + '/listaClientes');
    }

    login(data: any) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/login', data, this.options)
                .subscribe(Response => {
                    resolve(Response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    buscarUsuarioPorId(id: any) {
        return new Promise((resolve, reject) => {
            this.http.get(this.url + '/usuario/listar/' + id)
                .subscribe(response => {
                    resolve(response);
                    //console.log("Respuesta api buscarUsuarioPorId: " + JSON.stringify(response));
                }, (error) => {
                    reject("Error api buscarUsuarioPorId:" + JSON.stringify(error));
                });
        });
    }

    verificarExiste(data: any) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/usuario/existe', data, this.options)
                .subscribe(Response => {
                    resolve(Response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    insertarClienteBD(data: any) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/usuario/insertar', data, this.options)
                .subscribe(response => {
                    resolve(response);
                    //console.log("respuesta API insertarClienteBD_Gmail: " + JSON.stringify(response));
                }, (error) => {
                    reject("error API insertarClienteBD: " + JSON.stringify(error));
                });
        });
    }

    insertarSuscripcion(data: any) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/suscripcion/insertar', data, this.options)
                .subscribe(response => {
                    resolve(response);
                    //console.log("respuesta API insertarClienteBD_Gmail: " + JSON.stringify(response));
                }, (error) => {
                    reject("error API suscripcion: " + JSON.stringify(error));
                });
        });
    }

    setUserLoggedIn(userLoggedIn: boolean) {
        this.userLoggedIn.next(userLoggedIn);
    }

    getUserLoggedIn(): Observable<boolean> {
        return this.userLoggedIn.asObservable();
    }

    listarCategoria() {
        return this.http.get<any[]>(this.url + '/categoria/listar');
    }

    insertarCategoria(data: any) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/categoria/insertar', data, this.options)
                .subscribe(response => {
                    resolve(response);
                    //console.log("respuesta API insertarClienteBD_Gmail: " + JSON.stringify(response));
                }, (error) => {
                    reject("error API insertarCategoria: " + JSON.stringify(error));
                });
        });
    }

    eliminarCategoria(id: any) {
        return new Promise((resolve, reject) => {
            this.http.delete(this.url + '/categoria/eliminar/' + id)
                .subscribe(response => {
                    resolve(response);
                    //console.log("Respuesta api buscarUsuarioPorId: " + JSON.stringify(response));
                }, (error) => {
                    reject("Error api eliminarCategoria:" + JSON.stringify(error));
                });
        });
    }

    listarProductos() {
        return this.http.get<any[]>(this.url + '/producto/listar');
    }

    insertarProducto(data: any) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/producto/insertar', data, this.options)
                .subscribe(response => {
                    resolve(response);
                    //console.log("respuesta API insertarClienteBD_Gmail: " + JSON.stringify(response));
                }, (error) => {
                    reject("error API insertarProducto: " + JSON.stringify(error));
                });
        });
    }

    eliminarProducto(id: any) {
        return new Promise((resolve, reject) => {
            this.http.delete(this.url + '/producto/eliminar/' + id)
                .subscribe(response => {
                    resolve(response);
                    //console.log("Respuesta api buscarUsuarioPorId: " + JSON.stringify(response));
                }, (error) => {
                    reject("Error api eliminarProducto:" + JSON.stringify(error));
                });
        });
    }

    buscarProductoPorId(id: any) {
        return new Promise((resolve, reject) => {
            this.http.get(this.url + '/producto/listar/' + id)
                .subscribe(response => {
                    resolve(response);
                    //console.log("Respuesta api buscarUsuarioPorId: " + JSON.stringify(response));
                }, (error) => {
                    reject("Error api buscarProductoPorId:" + JSON.stringify(error));
                });
        });
    }

    buscarCarritoPorCliente(id: any) {
        return new Promise((resolve, reject) => {
            this.http.get(this.url + '/carrito/listar/' + id)
                .subscribe(response => {
                    resolve(response);
                    //console.log("Respuesta api buscarUsuarioPorId: " + JSON.stringify(response));
                }, (error) => {
                    reject("Error api buscarCarritoPorCliente:" + JSON.stringify(error));
                });
        });
    }

    verificarProductoExiste(data: any) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/carrito/verificar/producto', data, this.options)
                .subscribe(Response => {
                    resolve(Response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    insertarCarrito(data: any) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/carrito/insertar', data, this.options)
                .subscribe(response => {
                    resolve(response);
                    //console.log("respuesta API insertarClienteBD_Gmail: " + JSON.stringify(response));
                }, (error) => {
                    reject("error API insertarCarrito: " + JSON.stringify(error));
                });
        });
    }

    listarOrden() {
        return this.http.get<any[]>(this.url + '/orden/listar');
    }

    insertarOrden(data: any) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/orden/insertar', data, this.options)
                .subscribe(response => {
                    resolve(response);
                    //console.log("respuesta API insertarClienteBD_Gmail: " + JSON.stringify(response));
                }, (error) => {
                    reject("error API insertarOrden: " + JSON.stringify(error));
                });
        });
    }

    insertarDetalleOrden(data: any) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/detalleOrden/insertar', data, this.options)
                .subscribe(response => {
                    resolve(response);
                    //console.log("respuesta API insertarClienteBD_Gmail: " + JSON.stringify(response));
                }, (error) => {
                    reject("error API insertarOrden: " + JSON.stringify(error));
                });
        });
    }
    listarOrdenPorCliente(id: any) {
        return this.http.get<any[]>(this.url + '/orden/listar/' + id);
    }
    
    buscarOrdenPorCliente(id: any) {
        return new Promise((resolve, reject) => {
            this.http.get(this.url + '/orden/listar/' + id)
                .subscribe(response => {
                    resolve(response);
                    //console.log("Respuesta api buscarUsuarioPorId: " + JSON.stringify(response));
                }, (error) => {
                    reject("Error api buscarCarritoPorCliente:" + JSON.stringify(error));
                });
        });
    }

    listarDetallePorOrden(id: any) {
    return new Promise((resolve, reject) => {
            this.http.get(this.url + '/detalleOrden/listar/' + id)
                .subscribe(response => {
                    resolve(response);
                    //console.log("Respuesta api buscarUsuarioPorId: " + JSON.stringify(response));
                }, (error) => {
                    reject("Error api listarDetallePorOrden:" + JSON.stringify(error));
                });
        });
    }
}