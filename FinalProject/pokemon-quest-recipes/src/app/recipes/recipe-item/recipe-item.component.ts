import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  @Input('showType') showType: boolean = true;
  @Input('recipe') recipe: Recipe;

  getIngredientIconPath(ingredient: string) {
    return `../../../assets/images/ingredients/${ingredient}.png`;
  }
}
