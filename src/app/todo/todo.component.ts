import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AUTHENTICATED_USER } from '../service/basic-authentication.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id!: number;
  todo!: Todo;

  constructor(
    private todoService: TodoDataService,
    private route :ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id  = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, AUTHENTICATED_USER, false, new Date());
    if (this.id != -1) {
      this.todoService.retrieveTodo(AUTHENTICATED_USER, this.id).subscribe(
        response => this.todo = response
      );
    }
  }

  saveTodo():void{

    if(this.id === 0){
      //Create todo
      this.todoService.createTodo(AUTHENTICATED_USER, this.todo).subscribe(
        response => {
          console.log(response)
          this.router.navigate(['todos'])
        }
      )
    }else{
      this.todoService.updateTodo(AUTHENTICATED_USER, this.id, this.todo).subscribe(
        response => {
          console.log(response)
          this.router.navigate(['todos'])
        }
      )
    }
  }

}
