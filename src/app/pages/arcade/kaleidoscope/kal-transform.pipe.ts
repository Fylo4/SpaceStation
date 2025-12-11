import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'kalTransform', standalone: true })
export class KalTransformPipe implements PipeTransform {
  transform(
    selectionX: number,
    selectionY: number,
    selectionAngle: number,
    selectionRadius: number,
    renderRadius: number,
    renderDeltaX: number,
    renderDeltaY: number,
    thirdRotations: number
  ): string {
    const scaleFactor = renderRadius / selectionRadius;
    const oddParity = (renderDeltaX + renderDeltaY) % 2 != 0;
    const dxPx = (renderDeltaX * 1.5 - (oddParity ? 0 : 0.5) + 0.5) * renderRadius;
    const dyPx = (renderDeltaY * renderRadius * Math.sqrt(3)) / 2;
    const flip = oddParity;
    thirdRotations = 2 * (renderDeltaY % 3);
    return (
      `transform-origin: ${selectionX}px ${selectionY}px; ` +
      `transform:` +
      `translate(${250 - selectionX + dxPx}px, ${250 - selectionY + dyPx}px)` +
      (flip ? `scale(-1, 1)` : '') +
      `rotate(${-selectionAngle + (Math.PI * 2 * thirdRotations) / 3}rad)` +
      `scale(${scaleFactor}, ${scaleFactor})`
    );
  }
}
