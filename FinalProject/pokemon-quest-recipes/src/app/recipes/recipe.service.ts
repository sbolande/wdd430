import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';

import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private recipes: Recipe[] = [];
  recipesUpdated = new Subject<Recipe[]>();

  private recipesUrl = 'http://localhost:3000/api/recipes';

  constructor(private http: HttpClient, private router: Router) {}

  /**************** CRUD ****************/
  getRecipes(resolve?: Function, reject?: Function): void {
    this.http
      .get<{ message: string; recipes: Recipe[] }>(this.recipesUrl)
      .subscribe({
        next: (res) => {
          this.recipes = res.recipes;
          this.sortAndSend();
          resolve();
        },
        error: (err) => {
          console.error(err.message);
          reject(err);
        },
      });
  }

  getRecipe(id: string, resolve?: Function, reject?: Function): void {
    this.http.get<Recipe>(`${this.recipesUrl}/${id}`).subscribe({
      next: (res) => {
        resolve(res);
      },
      error: (err) => {
        console.error(err.message);
        reject(err);
      },
    });
  }

  addRecipe(recipe: Recipe, resolve?: Function, reject?: Function): void {
    if (!recipe) return null;
    recipe.id = ''; // clear ID for Mongo
    this.http
      .post<{ message: string; recipe: Recipe }>(this.recipesUrl, recipe, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.recipes.push(res.recipe);
          this.sortAndSend();
          resolve(res);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err.message);
          reject(err);
        },
      });
  }

  updateRecipe(
    original: Recipe,
    newRecipe: Recipe,
    resolve?: Function,
    reject?: Function
  ): void {
    if (!original || !newRecipe) {
      console.log('ERROR: original or new recipe were not sent');
      reject({ message: 'A problem occured trying to update the recipe.' });
      return;
    }
    const pos = this.recipes.findIndex((r) => r.id === original.id);
    if (pos < 0 && this.recipes.length > 0) {
      console.log('ERROR: original not found in recipe list');
      reject({
        message:
          'A problem occured trying to update the recipe. Are you sure it still exists?',
      });
      return;
    }

    newRecipe.id = original.id;
    this.http
      .put<{ message: string }>(
        `${this.recipesUrl}/${original.id}`,
        newRecipe,
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
      .subscribe({
        next: (res) => {
          console.log(res.message);
          if (pos > 0) {
            this.recipes[pos] = newRecipe;
          } else {
            this.getRecipes();
          }
          this.sortAndSend();
          resolve(res);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err.message);
          reject(err);
        },
      });
  }

  deleteRecipe(recipe: Recipe, resolve?: Function, reject?: Function): void {
    if (!recipe) return null;
    const pos = this.recipes.findIndex((r) => r.id === recipe.id);
    if (pos < 0 && this.recipes.length > 0) return null;
    this.http
      .delete<{ message: string }>(`${this.recipesUrl}/${recipe.id}`)
      .subscribe({
        next: (res) => {
          console.log(res.message);
          if (pos > 0) {
            this.recipes.splice(pos, 1);
          } else {
            this.getRecipes();
          }
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
