import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'times', standalone: true })
export class TimesPipe implements PipeTransform {
  transform(value: number) {
    const iterable = {} as Iterable<unknown>;
    iterable[Symbol.iterator] = function* () {
      let n = 0;
      while (n < value) {
        yield n++;
      }
    };
    return iterable;
  }
}
