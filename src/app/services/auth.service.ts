import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    private isloggedIn: boolean;
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('' || null)));
        this.user = this.userSubject.asObservable();
        this.isloggedIn = false;
    }


    public get userValue() {
        const token = localStorage.getItem('userData');
        console.log(token);
        return token;
    }

    public get getUserDetails() {
        const token = localStorage.getItem('userData');
        const tokenData = window.atob(token.split('.')[1]);
        return tokenData;
    }

    login(logindata: any) {
        console.log(logindata);
        return this.http.post<User>(`${environment.API_HOST}api/v1/auth/login`, logindata).pipe(map((userData: any) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log(userData)
            localStorage.setItem('userData', userData.result.token);
            this.userSubject.next(userData);
            return userData;
        }));

    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('userData');
        this.userSubject.next(null);
        this.router.navigate(['login']);
    }

    register(user: User) {
        console.log(user);
        return this.http.post(`${environment.API_HOST}/api/v1/auth/signup`, user);
    }

    isAdmin() {
        return localStorage.getItem('role') === 'admin';
    }

    forgotPassword(email: string) {
        return this.http.post(`${environment.API_HOST}/api/v1/auth/forgot-password`, { email });
    }

    resetPassword(otp, password) {
        const payLoad = { otp, password };
        console.log(payLoad)
        return this.http.post(`${environment.API_HOST}/api/v1/auth/reset-password`, payLoad);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.API_HOST}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.API_HOST}/users/${id}`);
    }

    // update(id, params) {
    //     return this.http.put(`${environment. API_HOST}/api/v1/staffs/`, params)
    //         .pipe(map(x => {
    //             // update stored user if the logged in user updated their own record
    //             if (id == this.userValue.firstName) {
    //                 // update local storage
    //                 const user = { ...this.userValue, ...params };
    //                 localStorage.setItem('user', JSON.stringify(user));

    //                 // publish updated user to subscribers
    //                 this.userSubject.next(user);
    //             }
    //             return x;
    //         }));
    // }

    // delete(id: string) {
    //     return this.http.delete(`${environment. API_HOST}/users/${id}`)
    //         .pipe(map(x => {
    //             // auto logout if the logged in user deleted their own record
    //             if (id == this.userValue.id) {
    //                 this.logout();
    //             }
    //             return x;
    //         }));
    // }
}