import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'Test Recipe',
      'This is a test.',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGyMpH4fBFm11jcfbFYHgZtUIf9ULymnLI0A&usqp=CAU'
    ),
    new Recipe(
      'Test Recipe',
      'This is a test.',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGyMpH4fBFm11jcfbFYHgZtUIf9ULymnLI0A&usqp=CAU'
    ),
    new Recipe(
      'Test Recipe',
      'This is a test.',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGyMpH4fBFm11jcfbFYHgZtUIf9ULymnLI0A&usqp=CAU'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  OnRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
