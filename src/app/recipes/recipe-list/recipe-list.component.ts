import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipesService: RecipeService) { }

  ngOnInit() {
    this.recipesService.recipesChanged.subscribe((recipes) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipesService.getRecipes();
  }

}
