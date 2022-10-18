import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Test Recipe 1',
      'This is the first test.',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGyMpH4fBFm11jcfbFYHgZtUIf9ULymnLI0A&usqp=CAU',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Test Recipe 2',
      'This is the second test.',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGyMpH4fBFm11jcfbFYHgZtUIf9ULymnLI0A&usqp=CAU',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Test Recipe 3',
      'This is the third test.',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGyMpH4fBFm11jcfbFYHgZtUIf9ULymnLI0A&usqp=CAU',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
}
