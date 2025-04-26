import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'phone', standalone: true })
export class PhonePipe implements PipeTransform {
  transform = (phone?: string): string => {
    if (phone == null) return '';

    const nums = this.onlyNumbers(phone);
    if (nums.length <= 3) return nums.slice(0, 3);
    let ret = '(' + nums.slice(0, 3);
    if (nums.length > 3) ret += ') ' + nums.slice(3, 6);
    if (nums.length > 6) ret += '-' + nums.slice(6, 10);

    return ret;
  };

  onlyNumbers = (input: string): string => {
    let ret = '';
    for (const char of input) {
      if (char <= '9' && char >= '0') ret += char;
    }
    return ret;
  };
}
