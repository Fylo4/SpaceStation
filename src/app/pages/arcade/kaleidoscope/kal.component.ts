import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KalTransformPipe } from './kal-transform.pipe';

@Component({
  selector: 'app-kal',
  templateUrl: './kal.component.html',
  styleUrl: './kal.component.scss',
  standalone: true,
  imports: [FormsModule, KalTransformPipe],
})
export class KalComponent {
  selectionAngle = signal(0);
  selectionX = signal(96);
  selectionY = signal(110);
  selectionRadius = signal(50);

  xs = [-3, -2, -1, 0, 1, 2, 3];
  ys = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6];

  renderRadius = signal(50);

  maskPoints = computed(() => {
    const oa = this.selectionAngle();
    const ox = this.selectionX();
    const oy = this.selectionY();
    const r = this.selectionRadius();
    return (
      `polygon(` +
      `${Math.round(Math.cos(oa) * r + ox)}px ${Math.round(Math.sin(oa) * r + oy)}px, ` +
      `${Math.round(Math.cos(oa + (Math.PI * 2) / 3) * r + ox)}px ${Math.round(Math.sin(oa + (Math.PI * 2) / 3) * r + oy)}px, ` +
      `${Math.round(Math.cos(oa + (Math.PI * 4) / 3) * r + ox)}px ${Math.round(Math.sin(oa + (Math.PI * 4) / 3) * r + oy)}px)`
    );
  });

  displayTransformation1 = computed(() => {
    const scaleFactor = this.renderRadius() / this.selectionRadius();
    return (
      `transform-origin: ${this.selectionX()}px ${this.selectionY()}px; ` +
      `transform: translate(${250 - this.selectionX()}px, ${250 - this.selectionY()}px) rotate(${-this.selectionAngle()}rad) scale(${scaleFactor})`
    );
  });

  testMouseMove(event: MouseEvent) {
    console.log(event);
    this.selectionX.set(event.offsetX); // Or clientX, x, pageX
    this.selectionY.set(event.offsetY);
  }
}
