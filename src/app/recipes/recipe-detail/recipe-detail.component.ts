import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ShoppingListService} from '../../services/shopping-list.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService,
              private recipeService: RecipeService,
              private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.recipe = this.recipeService.getRecipes().find((recipe) => recipe.id === +params.id);
    });
  }

  toShoppingList() {
    console.log(this.recipe.ingredients);
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }
}
