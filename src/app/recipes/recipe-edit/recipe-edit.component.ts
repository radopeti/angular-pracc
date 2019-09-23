import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {RecipeService} from '../../services/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  private id: number;
  private isEditing: boolean;
  private recipeForm: FormGroup;
  private recipeToEdit: Recipe;
  private recToUpdate: Recipe;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.id = +params.id;
        this.isEditing = params.id != null;
        this.initForm();
    });
  }

  onSubmit() {
    if (this.isEditing) {
      console.log(this.recipeToEdit);
      this.recToUpdate = Object.assign({}, this.recipeForm.value);
      this.recToUpdate.id = this.recipeToEdit.id;
      this.recipeService.updateRecipe(this.recToUpdate);
    } else {
      console.log('add');
      this.recipeService.addRecipe(this.recipeForm.value as Recipe);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDesc = '';
    const recIngredients = new FormArray([]);

    if (this.isEditing) {
      this.recipeToEdit = this.recipeService.getRecipe(this.id);
      recipeName = this.recipeToEdit.name;
      recipeImgPath = this.recipeToEdit.imagePath;
      recipeDesc = this.recipeToEdit.description;
      if (this.recipeToEdit.ingredients) {
        for (const ingredient of this.recipeToEdit.ingredients) {
          recIngredients.push(new FormGroup({
            name: new FormControl(ingredient.name),
            amount: new FormControl(ingredient.amount),
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImgPath),
      description: new FormControl(recipeDesc),
      ingredients: recIngredients,
    });
  }

  onAddIngredient() {
    (this.recipeForm.controls.ingredients as FormArray).push(new FormGroup({
      name: new FormControl(),
      amount: new FormControl(),
    }));
  }
}
