import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../services/shopping-list.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.addItemEmit.subscribe(
      (ingredient: Ingredient) => this.ingredients.push(ingredient));
    this.shoppingListService.addItemsEmit.subscribe((ingredients) => this.ingredients = ingredients);
  }

  startEditing(id: number) {
    this.shoppingListService.editStarted.next(id);
  }
}
