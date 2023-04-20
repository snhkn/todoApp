import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
import { AUTHENTICATED_USER } from '../service/basic-authentication.service';

export class Todo {

  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) { }

}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos: Todo[] = [];
  message: string = '';
  username!: any;

  constructor(
    private todoService: TodoDataService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem(AUTHENTICATED_USER);
    this.refreshTodos();
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos(this.username).subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    );
  }

  deleteTodo(id: number): void {
    console.log(`Delete todo id:${id}`);
    this.todoService.deleteTodo(this.username, id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of Todo ${id} Successful!`;
        this.refreshTodos();
      }
    )
  }

  updateTodo(id: number): void {
    console.log(`Update todo id:${id}`);
    this.router.navigate(['todos', id])
  }

  addTodo(): void {
    this.router.navigate(['todos', -1])
  }
}
