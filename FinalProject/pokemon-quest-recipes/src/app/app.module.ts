import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { AppComponent } from './app.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeCreateComponent } from './recipes/recipe-create/recipe-create.component';
import { HeaderComponent } from './header/header.component';
import { ErrorCardComponent } from './error-card/error-card.component';
import { RecipeItemComponent } from './recipes/recipe-item/recipe-item.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeCreateComponent,
    HeaderComponent,
    ErrorCardComponent,
    RecipeItemComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
