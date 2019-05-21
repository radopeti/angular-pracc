import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomate', 10)
  ];

  constructor() { }

  ngOnInit() {
  }

  addIngredientToShoppingList(ingredient: Ingredient) {
    console.log(ingredient);
    this.ingredients.push(ingredient);
  }
}
