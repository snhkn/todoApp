import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http : HttpClient) { }

  // http://localhost:8080/basicauth
  executeAuthenticationService(username:string, password : string){
    let basicAuthHeaderString = 'Basic '+ window.btoa(username+':'+password);
    
    let header = new HttpHeaders({
      Authorization : basicAuthHeaderString
    });
    return this.http.get<AuthenticationBean>(`http://localhost:8080/basicauth`, 
      {headers : header}).pipe(
        map(
          data => {
            //Set authenticated user and toke in session storage
            sessionStorage.setItem('authenticatedUser',username);
            sessionStorage.setItem('token',basicAuthHeaderString);
            return data;
          }
        )
      );
    //console.log("Execute Basic Authentication Bean Service");
  }

  //Get authenticated user from session storage
  getAuthenticatedUser(){
   return sessionStorage.getItem('authenticatedUser')
  }

  //Get authenticated token from session storage
  getAuthenticatedToken() : any {
    if(this.getAuthenticatedUser())
      return sessionStorage.getItem('token')
  }


  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticatedUser')
    return !(user === null)
  }
  
  logout(){
    sessionStorage.removeItem('authenticatedUser')
    sessionStorage.removeItem('token')
  }
}
export class AuthenticationBean{
  constructor(public message : string){}
}


