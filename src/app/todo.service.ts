import { Injectable, EventEmitter } from '@angular/core';
import { TodoItem } from './todo-item.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private localStorageKey = 'todoItems';
  newItemAdded = new EventEmitter<void>();

  constructor() { }

  getItems(): TodoItem[] {
    const storedItems = localStorage.getItem(this.localStorageKey);
    return storedItems ? JSON.parse(storedItems) : [];
  }

  addItem(item: TodoItem): void {
    const storedItems = this.getItems();
    storedItems.push(item);
    localStorage.setItem(this.localStorageKey, JSON.stringify(storedItems));
    this.newItemAdded.emit();
  }

  removeItem(index: number): void {
    const storedItems = this.getItems();
    storedItems.splice(index, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(storedItems));
  }
}