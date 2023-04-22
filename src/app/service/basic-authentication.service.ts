import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticatedUser';

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
    return this.http.get<AuthenticationBean>(`${API_URL}/basicauth`, 
      {headers : header}).pipe(
        map(
          data => {
            //Set authenticated user and toke in session storage
            sessionStorage.setItem(AUTHENTICATED_USER,username);
            sessionStorage.setItem(TOKEN,basicAuthHeaderString);
            return data;
          }
        )
      );
    //console.log("Execute Basic Authentication Bean Service");
  }

  executeJWTAuthenticationService(username:string, password : string){
   
    return this.http.post<any>(`${API_URL}/authenticate`, {
      username,
      password
    }).pipe(
        map(
          data => {
            //Set authenticated user and toke in session storage
            sessionStorage.setItem(AUTHENTICATED_USER,username);
            sessionStorage.setItem(TOKEN,`Bearer ${data.token}`);
            return data;
          }
        )
      );
    //console.log("Execute Basic Authentication Bean Service");
  }

  //Get authenticated user from session storage
  getAuthenticatedUser(){
   return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  //Get authenticated token from session storage
  getAuthenticatedToken() : any {
    if(this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN)
  }


  isUserLoggedIn(){
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }
  
  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
  }
}
export class AuthenticationBean{
  constructor(public message : string){}
}


