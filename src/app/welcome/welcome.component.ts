import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelloWorldBean, WelcomeDataService } from '../service/data/welcome-data.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit{

  name! : any;
  welcomeMessageFromService :string = ''

  //ActivatedRoute
  constructor(
    private route : ActivatedRoute,
    private service : WelcomeDataService, 
    private basicAuthenticationService : BasicAuthenticationService
  ){}

  ngOnInit(): void {
    //console.log("Welcome component snapshot "+ this.route.snapshot.params['name'])
    //this.name = this.route.snapshot.params['name'];
    this.name = this.basicAuthenticationService.getAuthenticatedUser();
  }

  getWelcomeMessage(){
    //console.log(this.service.executeHelloWorldBeanService());
    this.service.executeHelloWorldBeanService().subscribe({
        next: response => this.handleSuccessfulResponse(response),
        error: error => this.handleErrorResponse(error)
    });
    //console.log('last line of get welcome message')
  }

  getWelcomeMessageWithParameter(){
    console.log("welcome message with parameter "+this.name);
    this.service.executeHelloWorldBeanServiceWithPathVariable(this.name).subscribe({
        next: response => this.handleSuccessfulResponse(response),
        error: error => this.handleErrorResponse(error)
    });
    
  }

  handleSuccessfulResponse(response: HelloWorldBean){
    this.welcomeMessageFromService = response.message;
    console.log(response);
    console.log(response.message);
  }

  handleErrorResponse(error: any){
    console.log(error);
    console.log(error.error);
    console.log(error.error.message);
    this.welcomeMessageFromService = error.error.message;
  }
}
