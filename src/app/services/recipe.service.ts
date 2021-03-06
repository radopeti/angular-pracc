import {Injectable} from '@angular/core';
import {Recipe} from '../recipes/recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private idSeq = 3;

  private recipes: Recipe[] = [
    new Recipe(1, 'name',
      'diszkripcsN',
      'https://www.tasteofhome.com/wp-content/uploads/2017/10/Healthier-than-Egg-Rolls_EXPS_SDON17_55166_C06_23_6b-696x696.jpg',
      [
        new Ingredient('buksi', 1),
        new Ingredient('roka', 2)
      ]),
    new Recipe(2, 'pörkőt', 'jó', 'https://upload.wikimedia.org/wikipedia/co' +
      'mmons/thumb/5/52/P%C3%B6rk%C3%B6lt.jpg/250px-P%C3%B6rk%C3%B6lt.jpg',
      [
        new Ingredient('alma', 3),
        new Ingredient('körte', 1)
      ])
  ];

  recipeSelected: Subject<Recipe> = new Subject<Recipe>();
  recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    const rec = this.recipes.find((recipe) => recipe.id === id);
    return rec;
  }

  addRecipe(recipe: Recipe): void {
    recipe.id = this.idSeq;
    this.idSeq++;
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(recipe: Recipe) {
    Object.assign(this.getRecipe(recipe.id), recipe);
    this.recipesChanged.next(this.getRecipes());
  }
}
