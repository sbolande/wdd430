import { Component, Input } from '@angular/core';
import { RecipeService } from '../recipe.service';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  @Input('showType') showType: boolean = true;
  @Input('showQuality') showQuality: boolean = true;
  @Input('recipe') recipe: Recipe;

  constructor(private recipeService: RecipeService) {}

  getIngredientIconPath(ingredient: string) {
    return `../../../assets/images/ingredients/${ingredient}.png`;
  }

  getQualityClass() {
    if (this.recipe.quality === 'Normal') return 'normal';
    if (this.recipe.quality === 'Good') return 'good';
    if (this.recipe.quality === 'Very Good') return 'verygood';
    if (this.recipe.quality === 'Special') return 'special';
    return '';
  }

  onDelete(recipe: Recipe) {
    this.recipeService.deleteRecipe(recipe);
  }
}
