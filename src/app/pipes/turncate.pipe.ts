import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'turncate',
  standalone: true,
  pure: false,
})
export class TurncatePipe implements PipeTransform {
  transform(value: string, limit: number = 10) {
    if (value.length < limit) {
      return value;
    }
    return value.substring(0, limit) + '...';
  }
}
