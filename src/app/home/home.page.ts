import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoItem } from '../todo-item.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  items: TodoItem[] = [];
  lastAddedItem: TodoItem | null = null;
  
  constructor(
    private router: Router,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.loadItems();
    this.todoService.listItensChanged.subscribe((item: TodoItem) => {
      this.loadItems();
      this.lastAddedItem = item;
    });
  }

  loadItems() {
    this.items = this.todoService.getItems();
  }

  addItem() {
    this.router.navigate(['/add-item']);
  }

  viewItem(id: number) {
    this.router.navigate(['/item-detail', id]);
  }

  removeItem(id: number) {
    this.todoService.removeItem(id);
    this.loadItems();
  }

  editItem(id: number) {
    this.router.navigate(['/edit-item', id]);
  }
}