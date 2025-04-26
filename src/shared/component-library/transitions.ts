import { animate, animateChild, AUTO_STYLE, group, query, state, style, transition } from '@angular/animations';

export function collapseTransitionY(time: number) {
  return [
    transition(':enter', [
      style({ height: '0', visibility: 'hidden', overflow: 'hidden' }),
      group([
        animate(time + 'ms', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
        query('@*', [animateChild()], { optional: true }),
      ]),
    ]),
    transition(':leave', [
      style({ height: AUTO_STYLE, visibility: AUTO_STYLE, overflow: 'hidden' }),
      group([
        animate(time + 'ms', style({ height: '0', visibility: 'hidden' })),
        query('@*', [animateChild()], { optional: true }),
      ]),
    ]),
  ];
}

export function collapseTransitionX(time: number) {
  return [
    transition(':enter', [
      style({ width: '0', visibility: 'hidden', overflow: 'hidden' }),
      group([
        animate(time + 'ms 0ms cubic-bezier(0.6, 0.3, 0.4, 0.7)', style({ width: AUTO_STYLE, visibility: AUTO_STYLE })),
        query('@*', [animateChild()], { optional: true }),
      ]),
    ]),
    transition(':leave', [
      style({ width: AUTO_STYLE, visibility: AUTO_STYLE, overflow: 'hidden' }),
      group([
        animate(time + 'ms 0ms cubic-bezier(0.6, 0.3, 0.4, 0.7)', style({ width: '0', visibility: 'hidden' })),
        query('@*', [animateChild()], { optional: true }),
      ]),
    ]),
  ];
}
export function fadeTransition(time: number) {
  return [
    transition(':enter', [
      style({ opacity: '0', visibility: 'hidden' }),
      group([
        animate(time + 'ms', style({ opacity: '1', visibility: AUTO_STYLE })),
        query('@*', [animateChild()], { optional: true }),
      ]),
    ]),
    transition(':leave', [
      style({ opacity: '1', visibility: AUTO_STYLE }),
      group([
        animate(time + 'ms', style({ opacity: '0', visibility: 'hidden' })),
        query('@*', [animateChild()], { optional: true }),
      ]),
    ]),
  ];
}

export function slideTransition(time: number, xLength: string, yLength: string) {
  return [
    transition(':enter', [
      style({ transform: `translate(${xLength}, ${yLength})` }),
      group([
        animate(time + 'ms', style({ transform: 'translate(0, 0)' })),
        query('@*', [animateChild()], { optional: true }),
      ]),
    ]),
    transition(':leave', [
      style({ transform: 'translate(0, 0)' }),
      group([
        animate(time + 'ms', style({ transform: `translate(${xLength}, ${yLength})` })),
        query('@*', [animateChild()], { optional: true }),
      ]),
    ]),
  ];
}

export function IconSpinnerTransition(time: number) {
  return [
    state(
      'false',
      style({
        transform: 'rotate(0deg)',
      })
    ),
    state(
      'true',
      style({
        transform: 'rotate(90deg)',
      })
    ),
    transition('false <=> true', animate(time + 'ms')),
  ];
}
//Give this to a container element to prevent children from animating on page load
export function noInitialAnimation() {
  return [transition(':enter', [query(':enter', [], { optional: true })])];
}
