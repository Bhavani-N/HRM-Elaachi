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
        // this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        // this.user = this.userSubject.asObservable();
        this.isloggedIn=false;
    }


    // public get userValue(): User {
    //     return this.userSubject.value;
    // }

    login(logindata: any) {
        console.log(logindata);
        return this.http.post<User>(`${environment.API_HOST}/api/v1/staffs/login`, logindata).pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.isloggedIn=true;
            
            return of(this.isloggedIn);
        }));
        
    }
    isUserLoggedIn(): boolean {
        return this.isloggedIn;
    }
 

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['login']);
    }

    register(user: User) {
        console.log(user);
        return this.http.post(`${environment. API_HOST}/api/v1/staffs/signup`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment. API_HOST}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment. API_HOST}/users/${id}`);
    }

    // update(id, params) {
    //     return this.http.put(`${environment. API_HOST}/users/${id}`, params)
    //         .pipe(map(x => {
    //             // update stored user if the logged in user updated their own record
    //             if (id == this.userValue.id) {
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