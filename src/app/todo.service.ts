import { Injectable, EventEmitter } from '@angular/core';
import { TodoItem } from './todo-item.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private localStorageKey = 'todoItems';
  listItensChanged = new EventEmitter<void>();

  constructor() { }

  getItem(id: number): TodoItem | null {
    const storedItems = this.getItems();
    const indexInArray = storedItems.findIndex(item => item.id === Number(id));
    
    if (indexInArray !== -1) {
      return storedItems[indexInArray];
    } else {
      return null;
    }
  }

  getId(id: number): number {
    const storedItems = this.getItems();
    return storedItems.findIndex(item => item.id === id);
  }

  getItems(): TodoItem[] {
    const storedItems = localStorage.getItem(this.localStorageKey);
    return storedItems ? JSON.parse(storedItems) : [];
  }

  addItem(item: TodoItem): void {
    const storedItems = this.getItems();
    item.id = this.generateId();
    storedItems.push(item);
    localStorage.setItem(this.localStorageKey, JSON.stringify(storedItems));
    this.listItensChanged.emit();
  }

  editItem(item: TodoItem): void {
    const storedItems = this.getItems();
    const id = this.getId(item.id);

    storedItems[id] = item;
    localStorage.setItem(this.localStorageKey, JSON.stringify(storedItems));
    this.listItensChanged.emit();
  }

  removeItem(idItem: number): void {
    const storedItems = this.getItems();
    const idStored = this.getId(idItem);

    if (idStored !== -1) {
      storedItems.splice(idStored, 1);
      localStorage.setItem(this.localStorageKey, JSON.stringify(storedItems));
    }
  }

  private generateId(): number {
    const storedItems = this.getItems();
    if (storedItems.length === 0) {
      return 1;
    } else {
      const lastId = Math.max(...storedItems.map(item => item.id));
      return lastId + 1;
    }
  }
}