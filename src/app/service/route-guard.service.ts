import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { HardcodedAuthenticationService } from './hardcoded-authentication.service';


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(
    private hardCodedAuthenticationService: HardcodedAuthenticationService,
    private Router: Router
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.hardCodedAuthenticationService.isUserLoggedIn())
      return true;

    this.Router.navigate(['login']);
    return false;
  }
}
