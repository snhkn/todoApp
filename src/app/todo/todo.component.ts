import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute } from '@angular/router';

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
    private route :ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id  = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, '', false, new Date());
    this.todoService.retrieveTodo('defaultuser', this.id).subscribe(
      response => this.todo = response
    );
  }
}
