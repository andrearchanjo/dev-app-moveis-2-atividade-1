import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoItem } from '../todo-item.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {

  title: string = '';
  description: string = '';

  constructor(
    private router: Router,
    private todoService: TodoService
  ) { }

  ngOnInit() {}

  close() {
    this.router.navigate(['/']);
  }

  saveItem() {
    const newItem: TodoItem = { title: this.title, description: this.description };
    this.todoService.addItem(newItem);
    this.router.navigate(['/']);
  }

}