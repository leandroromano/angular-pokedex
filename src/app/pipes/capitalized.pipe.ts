import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalized',
})
export class CapitalizedPipe implements PipeTransform {
  transform(value: string): string {
    let result = value[0].toUpperCase() + value.substring(1).toLowerCase()
    return result;
  }
}
