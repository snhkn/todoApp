import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private router : Router
  ){}

  ngOnInit(): void {
    
  }

  handleLogin() {
    console.log(this.username);
    if(this.username==='defaultuser' && this.password==='dummy'){
      //Redirect to the welcome page
      this.router.navigate(['welcome'])
      this.invalidLogin = false
    }else{
      this.invalidLogin = true
    }
  }

}
