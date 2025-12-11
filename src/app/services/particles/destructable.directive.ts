import { Directive, ElementRef, HostListener, inject, input, output } from '@angular/core';
import { ParticleService } from './particles.service';

@Directive({ selector: '[destructable]' })
export class DestructableDirective {
  private particleSvc = inject(ParticleService);
  private elemRef = inject(ElementRef);
  color = input('red', { alias: 'destructable' });
  destroyed = output<void>();

  @HostListener('click')
  destroy() {
    const rect = (this.elemRef.nativeElement as HTMLElement).getBoundingClientRect();
    const area = rect.width * rect.height;
    const count = Math.ceil(area / 100);
    for (let a = 0; a < count; a++) {
      this.particleSvc.CreateParticles({
        life: 50,
        xVel: Math.random() * 10 - 5,
        yVel: -Math.random() * 10,
        size: 10,
        x: Math.random() * rect.width + rect.left,
        y: Math.random() * rect.height + rect.top,
        color: this.color(),
      });
    }
    this.destroyed.emit();
  }
}
