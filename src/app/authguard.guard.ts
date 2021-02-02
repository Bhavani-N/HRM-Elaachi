import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
) {}

 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     const user = this.authService.userValue;
     console.log(user)
    if (user) {
        // authorised so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    alert('weetef');
    return false;

}
}
