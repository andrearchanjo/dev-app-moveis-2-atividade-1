import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home/home.page';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { EditItemComponent } from './edit-item/edit-item.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'add-item',
    component: AddItemComponent
  },
  {
    path: 'item-detail/:id',
    component: ItemDetailComponent
  },
  {
    path: 'edit-item/:id',
    component: EditItemComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }