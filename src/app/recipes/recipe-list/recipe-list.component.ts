import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('name', 'diszkripcsN', 'https://www.tasteofhome.com/wp-content/uploads/' +
      '2017/10/Healthier-than-Egg-Rolls_EXPS_SDON17_55166_C06_23_6b-696x696.jpg'),
    new Recipe('pörkőt', 'jó', 'https://upload.wikimedia.org/wikipedia/co' +
      'mmons/thumb/5/52/P%C3%B6rk%C3%B6lt.jpg/250px-P%C3%B6rk%C3%B6lt.jpg')
  ];

  @Output() selectedRecipe: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipeElement: Recipe) {
    this.selectedRecipe.emit(recipeElement);
  }
}
