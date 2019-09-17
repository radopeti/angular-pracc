import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../../services/shopping-list.service';
import {Form, NgForm} from '@angular/forms';
import index from '@angular/cli/lib/cli';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('form')
  form: NgForm;

  private isEditing = false;
  private ingeredientId: number;
  private ingredientToEdit: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListService.editStarted.subscribe((id: number) => {
      this.isEditing = true;
      this.ingeredientId = id;
      this.ingredientToEdit = this.shoppingListService.getIngredient(id);
      console.log('ing to edit', this.ingredientToEdit);
      this.form.setValue({name: this.ingredientToEdit.name, amount: this.ingredientToEdit.amount});
    });
  }

  onAddIngredient(form: NgForm) {
    if (this.isEditing) {
      console.log('update', this.ingeredientId);
      this.shoppingListService.updateIngredient(this.ingeredientId, new Ingredient(form.value.name, form.value.amount));
      this.isEditing = false;
    } else {
      this.shoppingListService.addIngredient(new Ingredient(form.value.name, form.value.amount));
    }
    form.reset();
  }

  onClear() {
    this.form.reset();
    this.isEditing = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.ingeredientId);
    this.isEditing = false;
    this.form.reset();
  }
}
