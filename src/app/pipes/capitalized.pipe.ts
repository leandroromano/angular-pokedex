import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalized',
})
export class CapitalizedPipe implements PipeTransform {
  transform(value: string[]): string {
    let result = value.map((text) => {
      return text[0].toUpperCase() + text.substring(1).toLowerCase();
    });
    return result.join('/');
  }
}
