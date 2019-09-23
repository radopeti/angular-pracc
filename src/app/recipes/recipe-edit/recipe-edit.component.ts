import {Component, OnInit} from '@angular/core';
import {Form, FormArray, FormControl, FormGroup} from '@angular/forms';
import {RecipeService} from '../../services/recipe.service';
import {ActivatedRoute} from '@angular/router';
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

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.id = +params.id;
        this.isEditing = params.id != null;
        this.initForm();
        console.log(this.recipeForm);
    });
  }

  onSubmit() {
    console.log(this.recipeForm.value);
    this.recipeService.addRecipe(this.recipeForm.value as Recipe);
  }

  private initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDesc = '';
    const recIngredients = new FormArray([]);

    if (this.isEditing) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDesc = recipe.description;
      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
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
