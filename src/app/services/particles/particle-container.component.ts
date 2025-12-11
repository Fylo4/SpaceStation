import { Component, inject } from '@angular/core';
import { ParticleService } from './particles.service';

@Component({
  selector: 'particle-container',
  templateUrl: './particle-container.component.html',
  styleUrl: './particle-container.component.scss',
  standalone: true,
  imports: [],
})
export class ParticleContainerComponent {
  private particleSvc = inject(ParticleService);
  particles = this.particleSvc.particles;
}
