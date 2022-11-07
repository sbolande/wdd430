import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0) return value;
    for (const item of value) {
      const resultArray = [];
      if (item[propName].includes(filterString)) {
        resultArray.push(item);
      }
      return resultArray;
    }
  }
}
