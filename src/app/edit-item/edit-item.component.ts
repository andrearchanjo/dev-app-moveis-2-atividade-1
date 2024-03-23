import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../todo.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss'],
})
export class EditItemComponent  implements OnInit {

  title: string = '';
  description: string = '';
  id: number = -1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todoService: TodoService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    const item = this.todoService.getItem(this.id)

    if (item !== null) {
      this.title = item.title;
      this.description = item.description
    } else {
      close();
    }
  }

  close() {
    this.router.navigate(['/']);
  }

  async editItem() {
    if (this.title.trim() === '' || this.description.trim() === '') {
      const toast = await this.toastController.create({
        message: 'Por favor, preencha todos os campos.',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }

    const editItem = this.todoService.getItem(this.id);
    if (editItem !== null) {
      editItem.title = this.title;
      editItem.description = this.description;
      this.todoService.editItem(editItem);
      this.close();
    }
  }

}
