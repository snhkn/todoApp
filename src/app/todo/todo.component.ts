import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id!: number;
  username!: any;
  todo!: Todo;

  constructor(
    private todoService: TodoDataService,
    private route :ActivatedRoute,
    private router: Router,
    private basicAuthenticationservice: BasicAuthenticationService
  ) { }

  ngOnInit(): void {
    this.id  = this.route.snapshot.params['id'];
    this.username = this.basicAuthenticationservice.getAuthenticatedUser();
    this.todo = new Todo(this.id, '', false, new Date());
    if (this.id != -1) {
      this.todoService.retrieveTodo(this.username, this.id).subscribe(
        response => this.todo = response
      );
    }
  }

  saveTodo():void{

    if(this.id == -1){
      //Create todo
      this.todoService.createTodo(this.username, this.todo).subscribe(
        response => {
          console.log(response)
          this.router.navigate(['todos'])
        }
      )
    }else{
      this.todoService.updateTodo(this.username, this.id, this.todo).subscribe(
        response => {
          console.log(response)
          this.router.navigate(['todos'])
        }
      )
    }
  }

}
