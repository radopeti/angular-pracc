import {EventEmitter, Injectable, Output} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  @Output() addItemEmit: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();
  @Output() addItemsEmit: EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>();

  editStarted: Subject<number> = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomate', 10)
  ];

  constructor() { }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.addItemEmit.emit(ingredient);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.addItemsEmit.emit(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.addItemsEmit.emit(this.ingredients.slice());
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.addItemsEmit.emit(this.ingredients.slice());
  }
}
