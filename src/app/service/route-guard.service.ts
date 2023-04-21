import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { BasicAuthenticationService } from './basic-authentication.service';


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(
    private basicAuthenticationService: BasicAuthenticationService,
    private Router: Router
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.basicAuthenticationService.isUserLoggedIn())
      return true;

    this.Router.navigate(['login']);
    return false;
  }
}
