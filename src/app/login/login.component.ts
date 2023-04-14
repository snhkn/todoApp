import { Component, OnInit } from '@angular/core';

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

  constructor(){}

  ngOnInit(): void {
    
  }

  handleLogin() {
    console.log(this.username);
    if(this.username==='defaultuser' && this.password==='dummy'){
      this.invalidLogin = false
    }else{
      this.invalidLogin = true
    }
  }

}
