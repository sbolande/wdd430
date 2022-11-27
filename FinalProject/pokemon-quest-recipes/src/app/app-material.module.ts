import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [],
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatGridListModule,
    MatExpansionModule,
    MatSlideToggleModule,
  ],
  exports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatGridListModule,
    MatExpansionModule,
    MatSlideToggleModule,
  ],
  providers: [],
})
export class AppMaterialModule {}
