import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'join', standalone: true })
export class JoinPipe implements PipeTransform {
  transform(array: unknown[], separator: string = ', '): string {
    return array
      .filter(x => x != undefined && x != '')
      .map(x => x + '')
      .join(separator);
  }
}
