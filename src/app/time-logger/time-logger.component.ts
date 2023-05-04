import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';
import { AUTHENTICATED_USER } from '../service/basic-authentication.service';

@Component({
  selector: 'app-time-logger',
  templateUrl: './time-logger.component.html',
  styleUrls: ['./time-logger.component.css']
})
export class TimeLoggerComponent implements OnInit{

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {

  }

  saveTodoTimeLog(): void{

  }
}
