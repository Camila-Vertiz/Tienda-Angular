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

    setUserLoggedIn(userLoggedIn: boolean) {
        this.userLoggedIn.next(userLoggedIn);
    }

    getUserLoggedIn(): Observable<boolean> {
        return this.userLoggedIn.asObservable();
    }
}