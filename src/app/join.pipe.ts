import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join',
})
export class JoinPipe implements PipeTransform {

  transform(value: any[], ...args: unknown[]): unknown {
    return value ? value.join(', ') : null;
  }

}
