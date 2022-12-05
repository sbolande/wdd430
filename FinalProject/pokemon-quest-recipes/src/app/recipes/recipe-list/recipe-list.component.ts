import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import {
  Ingredient,
  Ingredients,
  Qualities,
  RecipeTypes,
} from '../constants.model';
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
  recipesByIngredient = {};
  recipesByQuality = {};

  sortBy = 0;
  isLoading = false;
  requestStatus = {
    message: '',
    succeeded: null,
  };

  recipeTypes = RecipeTypes;
  ingredients = Ingredients;
  qualities = Qualities;

  constructor(public recipeService: RecipeService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.recipeService.getRecipes(
      () => {
        this.isLoading = false;
        this.requestStatus = {
          message: '',
          succeeded: true,
        };
      },
      (err) => {
        this.isLoading = false;
        this.requestStatus = {
          message: err.message,
          succeeded: false,
        };
      }
    );
    this.recipeSub = this.recipeService.recipesUpdated.subscribe(
      (recipes: Recipe[]) => {
        console.log(recipes);
        this.recipes = recipes;
        RecipeTypes.forEach((type) => {
          this.recipesByType[type] = this.recipes
            .filter((r) => r.type === type)
            .sort((a, b) => {
              return (
                Qualities.indexOf(a.quality) - Qualities.indexOf(b.quality)
              );
            });
        });
        Ingredients.forEach((ingredient) => {
          this.recipesByIngredient[ingredient] = this.recipes
            .filter((r) => r.ingredients.includes(ingredient))
            .sort((a, b) => {
              return (
                Qualities.indexOf(a.quality) - Qualities.indexOf(b.quality)
              );
            });
        });
        Qualities.forEach((quality) => {
          this.recipesByQuality[quality] = this.recipes
            .filter((r) => r.quality === quality)
            .sort((a, b) => {
              return RecipeTypes.indexOf(a.type) - RecipeTypes.indexOf(b.type);
            });
        });
      }
    );
  }

  ngOnDestroy() {
    this.recipeSub.unsubscribe();
  }

  toggleSort(btnToggle) {
    this.sortBy = +btnToggle.value;
  }

  getRecipeImagePath(recipeType: string) {
    return `../../../assets/images/recipeTypes/${recipeType}.png`;
  }

  getIngredientImagePath(ingredient: string) {
    return `../../../assets/images/ingredients/${ingredient}.png`;
  }

  getQualityClass(quality: string) {
    if (quality === 'Normal') return 'normal';
    if (quality === 'Good') return 'good';
    if (quality === 'Very Good') return 'verygood';
    if (quality === 'Special') return 'special';
    return '';
  }

  getRecipeCountByType(type: string) {
    return this.getRecipeCount((r) => r.type === type);
  }

  getRecipeCountByIngredient(ingredient: Ingredient) {
    return this.getRecipeCount((r) => r.ingredients.includes(ingredient));
  }

  getRecipeCountByQuality(quality: string) {
    return this.getRecipeCount((r) => r.quality === quality);
  }

  private getRecipeCount(filter: any): string {
    let count = this.recipes.filter(filter).length;
    if (count > 100) return '99+';
    if (count < 0) return '0';
    return `${count}`;
  }
}
