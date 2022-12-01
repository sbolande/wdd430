import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { Recipe } from '../recipe.model';
import { Ingredients, Qualities, RecipeTypes } from '../constants.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css'],
})
export class RecipeCreateComponent implements OnInit {
  private recipeId: string;
  recipe: Recipe;

  mode = 'create';
  isLoading = false;
  requestStatus = {
    message: '',
    succeeded: null,
  };

  recipeTypes = RecipeTypes;
  ingredients = Ingredients;
  qualities = Qualities;

  constructor(
    public recipeService: RecipeService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('recipeId')) {
        this.mode = 'edit';
        this.recipeId = paramMap.get('recipeId');
        this.isLoading = true;
        this.recipeService
          .getRecipe(this.recipeId)
          .subscribe({
            next: (recipe) => {
              console.log(recipe);
              this.isLoading = false;
              this.recipe = recipe;
              this.requestStatus = {
                message: '',
                succeeded: true,
              };
            },
            error: this.onError,
          })
          .unsubscribe();
      } else {
        this.mode = 'create';
        this.recipeId = '';
      }
    });
  }

  private isFormValid(form: NgForm): boolean {
    let isValid = true;
    if (form.invalid) isValid = false;
    let { value, controls } = form;
    if (!RecipeTypes.includes(value.type)) {
      controls['type'].setErrors({ incorrect: true });
      isValid = false;
    }
    if (!Qualities.includes(value.quality)) {
      controls['quality'].setErrors({ incorrect: true });
      isValid = false;
    }
    if (!Ingredients.includes(value.ingredientOne)) {
      controls['ingredientOne'].setErrors({ incorrect: true });
      isValid = false;
    }
    if (!Ingredients.includes(value.ingredientTwo)) {
      controls['ingredientTwo'].setErrors({ incorrect: true });
      isValid = false;
    }
    if (!Ingredients.includes(value.ingredientThree)) {
      controls['ingredientThree'].setErrors({ incorrect: true });
      isValid = false;
    }
    if (!Ingredients.includes(value.ingredientFour)) {
      controls['ingredientFour'].setErrors({ incorrect: true });
      isValid = false;
    }
    if (!Ingredients.includes(value.ingredientFive)) {
      controls['ingredientFive'].setErrors({ incorrect: true });
      isValid = false;
    }
    return isValid;
  }
  private isFormInvalid = (form: NgForm) => !this.isFormValid(form);

  onSaveRecipe(form: NgForm) {
    this.requestStatus = {
      message: '',
      succeeded: null,
    };
    if (this.isFormInvalid(form)) return;
    this.isLoading = true;
    const newRecipe = new Recipe(
      form.value.type,
      [
        form.value.ingredientOne,
        form.value.ingredientTwo,
        form.value.ingredientThree,
        form.value.ingredientFour,
        form.value.ingredientFive,
      ],
      form.value.quality,
      form.value.pokemon
    );
    var request: Observable<any>;
    if (this.mode === 'create') {
      request = this.recipeService.addRecipe(newRecipe);
    } else if (this.mode === 'edit') {
      request = this.recipeService.updateRecipe(this.recipe, newRecipe);
    }
    if (!request) {
      this.onError({
        message: `A problem occured trying to ${this.mode} the recipe.`,
      });
      return;
    }
    request
      .subscribe({
        next: (res) => {
          form.resetForm();
          this.isLoading = false;
          this.requestStatus.succeeded = true;
        },
        error: this.onError,
      })
      .unsubscribe();
  }

  onError(err) {
    this.isLoading = false;
    this.requestStatus = {
      message: err.message,
      succeeded: false,
    };
  }
}
