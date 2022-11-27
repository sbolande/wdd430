import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredients, Recipe, RecipeTypes, RecipeType } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  private recipeSub: Subscription;
  recipesByType = {};

  isLoading = false;
  requestStatus = {
    message: '',
    succeeded: null,
  };

  recipeTypes = RecipeTypes;
  ingredients = Ingredients;

  constructor(public recipeService: RecipeService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.recipeService.getRecipes().subscribe({
      next: () => {
        this.isLoading = false;
        this.requestStatus = {
          message: '',
          succeeded: true,
        };
      },
      error: (err) => {
        this.isLoading = false;
        this.requestStatus = {
          message: err.message,
          succeeded: false,
        };
      },
    });
    this.recipeSub = this.recipeService.recipesUpdated.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
        RecipeTypes.forEach((type) => {
          this.recipesByType[type] = this.recipes.filter(
            (r) => r.type === type
          );
        });
      }
    );
  }

  ngOnDestroy() {
    this.recipeSub.unsubscribe();
  }

  getRecipeIconPath(recipeType: string) {
    return `../../../assets/images/${recipeType}.png`;
  }

  getRecipeCount(recipeType: string) {
    return this.recipes.filter((r) => r.type === recipeType).length;
  }

  onDelete(recipe: Recipe) {
    this.recipeService.deleteRecipe(recipe);
  }
}
