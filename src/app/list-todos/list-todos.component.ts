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
  username: any;
  selectedTodo!: Todo;
  isStarted: boolean = false;
  startTime: Date | null = null; // initialize to null
  interval: any;
  elapsedTime: { [id: number]: number } = {}; // elapsed time for each todo

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
        this.todos.forEach((todo) => {
          // initialize elapsed time for each todo to 0
          this.elapsedTime[todo.id] = 0;
        });
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
  
  toggleButton(todo: Todo) {
    if (this.isStarted) {
      // stop the timer
      clearInterval(this.interval);
      this.isStarted = false;
      if (this.startTime !== null) {
        // update elapsed time
        const id = this.selectedTodo?.id;
        if (id !== undefined) {
          const elapsed = this.elapsedTime[id] || 0;
          this.elapsedTime[id] = elapsed + new Date().getTime() - this.startTime.getTime();
        }
        this.startTime = null;
      }
    } else {
      // start the timer
      this.isStarted = true;
      this.selectedTodo = todo;
      this.startTime = new Date();
      var startTime = this.startTime.getTime();
      this.interval = setInterval(() => {
        const id = this.selectedTodo?.id;
        if (id !== undefined) {
          const elapsed = this.elapsedTime[id] || 0;
          this.elapsedTime[id] = elapsed + new Date().getTime() - startTime;
        }
      }, 1000);
    }
  }

  formatTime(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
  
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  }
}
