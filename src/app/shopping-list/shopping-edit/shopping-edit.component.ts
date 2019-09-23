import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../../services/shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('form')
  form: NgForm;

  private isEditing = false;
  private ingeredientId: number;
  private ingredientToEdit: Ingredient;
  private editSubscribtion: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.editSubscribtion = this.shoppingListService.editStarted.subscribe((id: number) => {
      this.isEditing = true;
      this.ingeredientId = id;
      this.ingredientToEdit = this.shoppingListService.getIngredient(id);
      this.form.setValue({name: this.ingredientToEdit.name, amount: this.ingredientToEdit.amount});
    });
  }

  onAddIngredient(form: NgForm) {
    if (this.isEditing) {
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

  ngOnDestroy(): void {
    this.editSubscribtion.unsubscribe();
  }
}
