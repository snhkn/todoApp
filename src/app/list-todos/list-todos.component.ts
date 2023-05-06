import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
import { AUTHENTICATED_USER } from '../service/basic-authentication.service';

export class Todo {

  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date,
    public elapsedTime: number
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
  firstStartflag: boolean = false;
  firstStartTime!: Date;

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
        response.forEach((todo) => {
          // initialize elapsed time for each todo
          this.elapsedTime[todo.id] = todo.elapsedTime || 0;
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
    this.router.navigate(['todos', id], { queryParams: { elapsedTime: this.elapsedTime[id] } })
  }

  addTodo(): void {
    this.router.navigate(['todos', -1])
  }

  toggleButton(todo: Todo) {
    // clear the interval and set it to null
    clearInterval(this.interval);
    this.interval = null;

    if (this.isStarted) {
      // stop the timer
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
      if (!this.firstStartflag) {
        this.firstStartTime = this.startTime;
        this.firstStartflag = true;
      }
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
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  resetButton(todo: Todo) {
    const id = todo.id;
    this.elapsedTime[id] = 0;
    this.isStarted = false;
    this.startTime = null;
    this.firstStartflag = false;
  }

  saveTodoTimeLog(id: number): void {
    const formattedElapsedTime = this.formatTime(this.elapsedTime[id]) || 0;
    const formattedStartTime = this.formatFullTime(this.firstStartTime);
    this.router.navigate(['timelogs', id], { queryParams: { formattedStartTime, formattedElapsedTime } })
  }

  formatFullTime(time: Date) {
    const year = time.getFullYear();
    const month = time.getMonth();
    const day = time.getDay();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    return `${year}-${month}-${day}, ${hour}:${minutes}:${seconds} `;

  }
}
