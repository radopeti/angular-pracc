import { Component, OnInit } from '@angular/core';
import {Form} from '@angular/forms';
import {RecipeService} from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  constructor(recipeService: RecipeService) { }

  ngOnInit() {
  }

  onAddRecipe(form: Form) {

  }
}
