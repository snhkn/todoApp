import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  // username = 'defaultuser'
  password = ''
  username! : any;
  errorMessage = 'invalid Credentials'
  invalidLogin = false

  //Dependency Injection
  //Inject Router to LoginComponent as a constructor argument 
  //Arguments inside constructor works as a member variables 
  constructor(
    private router : Router,
    public hardcodedAuthenticationService : HardcodedAuthenticationService, 
    private basicAuthenticationService : BasicAuthenticationService
  ){}

  ngOnInit(): void {
   this.username =  this.basicAuthenticationService.getAuthenticatedUser();
  }

  handleLogin() {
    console.log(this.username);
    if(this.hardcodedAuthenticationService.authenticate(this.username, this.password)){
      //Redirect to the welcome page
      this.router.navigate(['welcome', this.username])
      this.invalidLogin = false
    }else{
      this.invalidLogin = true
    }
  }

  handleBasicAuthLogin(){

    this.basicAuthenticationService.executeAuthenticationService(this.username, this.password)
      .subscribe({

        next : data => {
          console.log(data);
           //redirect to welcome page
          this.router.navigate(['welcome', this.username]);
          this.invalidLogin = false;
        },
        error : error => {
          console.log(error);
          this.invalidLogin = true;
        }
       });
     
  
  }

  handleJWTAuthLogin(){

    this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
      .subscribe({

        next : data => {
          console.log(data);
           //redirect to welcome page
          this.router.navigate(['welcome', this.username]);
          this.invalidLogin = false;
        },
        error : error => {
          console.log(error);
          this.invalidLogin = true;
        }
       });
     
  
  }

}
