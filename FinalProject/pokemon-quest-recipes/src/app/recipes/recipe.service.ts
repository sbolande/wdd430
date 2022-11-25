import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private recipes: Recipe[] = [];
  private recipesUpdated = new Subject<Recipe[]>();

  private recipesUrl = 'http://localhost:3000/api/recipes';

  constructor(private http: HttpClient, private router: Router) {}

  /**************** CRUD ****************/
  getRecipes(): void {
    this.http
      .get<{ message: string; recipes: Recipe[] }>(this.recipesUrl)
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.recipes = res.recipes;
          this.sortAndSend();
        },
        error: (err) => {
          console.error(err.message);
          console.error(err.error);
        },
      });
  }

  getRecipe(id: string): any {
    return this.http.get<Recipe>(`${this.recipesUrl}/${id}`);
  }

  addRecipe(recipe: Recipe): void {
    if (!recipe) return;
    recipe._id = ''; // clear ID for Mongo
    this.http
      .post<{ message: string; recipe: Recipe }>(this.recipesUrl, recipe, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.recipes.push(res.recipe);
          this.sortAndSend();
        },
        error: (err) => {
          console.error(err.message);
          console.error(err.error);
        },
      });
  }

  updateRecipe(original: Recipe, newRecipe: Recipe): void {
    if (!original || !newRecipe) return;
    const pos = this.recipes.indexOf(original);
    if (pos < 0) return;

    newRecipe._id = original._id;
    this.http
      .put<{ message: string }>(
        `${this.recipesUrl}/${original._id}`,
        newRecipe,
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.recipes[pos] = newRecipe;
          this.sortAndSend();
        },
        error: (err) => {
          console.error(err.message);
          console.error(err.error);
        },
      });
  }

  deleteRecipe(recipe: Recipe): void {
    if (!recipe) return;
    const pos = this.recipes.indexOf(recipe);
    if (pos < 0) return;
    this.http
      .delete<{ message: string }>(`${this.recipesUrl}/${recipe._id}`)
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.recipes.splice(pos, 1);
          this.sortAndSend();
        },
        error: (err) => {
          console.error(err.message);
          console.error(err.error);
        },
      });
  }

  /**************** HELPERS ****************/
  sortAndSend(): void {
    this.recipes.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    this.recipesUpdated.next([...this.recipes]);
  }
}
