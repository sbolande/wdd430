import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private recipes: Recipe[] = [];
  recipesUpdated = new Subject<Recipe[]>();

  private recipesUrl = 'http://localhost:3000/api/recipes';

  constructor(private http: HttpClient, private router: Router) {}

  /**************** CRUD ****************/
  getRecipes(): any {
    var request = this.http.get<{ message: string; recipes: Recipe[] }>(
      this.recipesUrl
    );
    request.subscribe({
      next: (res) => {
        console.log(res.message);
        this.recipes = res.recipes;
        this.sortAndSend();
      },
      error: (err) => {
        console.error(err.message);
      },
    });
    return request;
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.recipesUrl}/${id}`);
  }

  addRecipe(recipe: Recipe): any {
    if (!recipe) return null;
    recipe.id = ''; // clear ID for Mongo
    var request = this.http.post<{ message: string; recipe: Recipe }>(
      this.recipesUrl,
      recipe,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }
    );
    request.subscribe({
      next: (res) => {
        console.log(res.message);
        this.recipes.push(res.recipe);
        this.sortAndSend();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err.message);
      },
    });
    return request;
  }

  updateRecipe(original: Recipe, newRecipe: Recipe): any {
    if (!original || !newRecipe) return null;
    const pos = this.recipes.indexOf(original);
    if (pos < 0) return null;

    newRecipe.id = original.id;
    var request = this.http.put<{ message: string }>(
      `${this.recipesUrl}/${original.id}`,
      newRecipe,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    );
    request.subscribe({
      next: (res) => {
        console.log(res.message);
        this.recipes[pos] = newRecipe;
        this.sortAndSend();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err.message);
      },
    });
    return request;
  }

  deleteRecipe(recipe: Recipe): void {
    if (!recipe) return;
    const pos = this.recipes.indexOf(recipe);
    if (pos < 0) return;
    this.http
      .delete<{ message: string }>(`${this.recipesUrl}/${recipe.id}`)
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.recipes.splice(pos, 1);
          this.sortAndSend();
        },
        error: (err) => {
          console.error(err.message);
          throw err.error;
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
