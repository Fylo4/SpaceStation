import { PipeTransform, Pipe, Signal, isSignal } from '@angular/core';

@Pipe({ name: 'signalValue', standalone: true })
export class SignalValuePipe<T> implements PipeTransform {
  transform(input: T | Signal<T> | null | undefined): T | null | undefined {
    if (input == null) return input;
    if (isSignal(input)) return input();
    return input;
  }
}
