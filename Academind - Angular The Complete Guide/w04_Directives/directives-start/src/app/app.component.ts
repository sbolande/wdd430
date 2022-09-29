import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  numbers = [1, 2, 3, 4, 5];
  oddNumbers = this.numbers.filter((n) => n % 2 !== 0);
  evenNumbers = this.numbers.filter((n) => n % 2 === 0);
  onlyOdd = false;

  value = 10;
}
