import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

export class TimeLogger {

  constructor(
    public loggerId: number,
    public todoId: number,
    public startTime: string,
    public elapsedTime : number
  ) { }

}

@Component({
  selector: 'app-time-logger',
  templateUrl: './time-logger.component.html',
  styleUrls: ['./time-logger.component.css']
})
export class TimeLoggerComponent implements OnInit{

  loggerId!: number;
  todoId!: number;
  username!: any;
  startTime!: string;
  elapsedTime!: number;
  timeLogger!: TimeLogger;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private basicAuthenticationservice: BasicAuthenticationService
  ){}

  ngOnInit(): void {
    this.loggerId = this.route.snapshot.params['loggerId'];
    this.todoId = this.route.snapshot.params['todoId'];
    this.route.queryParams.subscribe(params => {
      this.startTime = params['formattedStartTime'];
      this.elapsedTime = params['formattedElapsedTime'] || 0;
    });
    this.username = this.basicAuthenticationservice.getAuthenticatedUser();
    this.timeLogger = new TimeLogger(this.loggerId, this.todoId,this.startTime, this.elapsedTime );

    const startTimeElem = document.getElementById('start-time');
    const elapsedTimeElem = document.getElementById('elapsed-time');

    if (startTimeElem) {
      
      startTimeElem.innerText = `Start Time: ${this.startTime}`;
    }
    
    if (elapsedTimeElem) {
      elapsedTimeElem.innerText = `Elapsed Time: ${this.elapsedTime}`;
    }
  }

  saveTodoTimeLog(): void{

  }

}
