import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeCreateComponent } from './recipes/recipe-create/recipe-create.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';

const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'create', component: RecipeCreateComponent },
  { path: 'edit/:recipeId', component: RecipeCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
