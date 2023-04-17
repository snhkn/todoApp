import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  username = 'defaultuser'
  password = ''
  errorMessage = 'invalid Credentials'
  invalidLogin = false

  //Dependency Injection
  //Inject Router to LoginComponent as a constructor argument 
  //Arguments inside constructor works as a member variables 
  constructor(
    private router : Router,
    private hardcodedAuthenticationService : HardcodedAuthenticationService
  ){}

  ngOnInit(): void {
    
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

}
