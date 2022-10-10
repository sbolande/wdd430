import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Test Recipe 1',
      'This is the first test.',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGyMpH4fBFm11jcfbFYHgZtUIf9ULymnLI0A&usqp=CAU'
    ),
    new Recipe(
      'Test Recipe 2',
      'This is the second test.',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGyMpH4fBFm11jcfbFYHgZtUIf9ULymnLI0A&usqp=CAU'
    ),
    new Recipe(
      'Test Recipe 3',
      'This is the third test.',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGyMpH4fBFm11jcfbFYHgZtUIf9ULymnLI0A&usqp=CAU'
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
