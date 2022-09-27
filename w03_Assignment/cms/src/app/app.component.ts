import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cms';
  selectedFeature: string;

  switchView(selectedFeature: string) {
    if (this.selectedFeature?.toUpperCase() !== selectedFeature.toUpperCase()) {
      this.selectedFeature = selectedFeature;
    }
  }
}
