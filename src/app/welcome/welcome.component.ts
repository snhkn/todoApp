import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelloWorldBean, WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit{

  name = ''
  welcomeMessageFromService :string = ''

  //ActivatedRoute
  constructor(
    private route : ActivatedRoute,
    private service : WelcomeDataService
  ){}

  ngOnInit(): void {
    //console.log(this.route.snapshot.params['name'])
    this.name = this.route.snapshot.params['name'];
  }

  getWelcomeMessage(){
    console.log(this.service.executeHelloWorldBeanService());
    this.service.executeHelloWorldBeanService().subscribe({
        next: response => this.handleSuccessfulResponse(response),
    });
    console.log('last line of get welcome message')
  }

  handleSuccessfulResponse(response: HelloWorldBean){
    this.welcomeMessageFromService = response.message;
    //console.log(response);
    //console.log(response.message);
  }
}
