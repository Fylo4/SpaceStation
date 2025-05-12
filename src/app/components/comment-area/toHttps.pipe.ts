import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'toHttps', standalone: true })
export class ToHttpsPipe implements PipeTransform {
  transform(input: string): string {
    if (input.startsWith('https://')) return input;
    return 'https://'+input;
  }
}
