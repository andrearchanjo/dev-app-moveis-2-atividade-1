import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoItem } from '../todo-item.model';
import { TodoService } from '../todo.service';
import { ToastController } from '@ionic/angular';

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
    private todoService: TodoService,
    private toastController: ToastController
  ) { }

  ngOnInit() {}

  close() {
    this.router.navigate(['/']);
  }

  async saveItem() {
    if (this.title.trim() === '' || this.description.trim() === '') {
      const toast = await this.toastController.create({
        message: 'Por favor, preencha todos os campos.',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }

    const newItem: TodoItem = { id: 0, title: this.title, description: this.description };
    this.todoService.addItem(newItem);
    this.close();
  }
}