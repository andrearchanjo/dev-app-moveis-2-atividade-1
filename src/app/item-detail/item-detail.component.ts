import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent  implements OnInit {

  title: string = '';
  description: string = '';

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
  ) {}

  ngOnInit() {
    const item = this.todoService.getItem(this.route.snapshot.params['id'])

    if (item !== null) {
      this.title = item.title;
      this.description = item.description
    }
  }

}
