import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ParticleService {
  particles: Particle[] = [];
  private gravity = 0.5;

  CreateParticles(particleOptions: IParticle, count: number = 1) {
    for (let a = 0; a < count; a++) {
      this.particles.push(new Particle(particleOptions));
      console.log('*');
    }
    if (!this.animationRunning) this.animate();
  }
  ClearAllParticles() {
    this.particles = [];
  }

  animationRunning = false;
  private animate() {
    this.animationRunning = true;
    for (let a = this.particles.length - 1; a >= 0; a--) {
      const p = this.particles[a];
      p.x += p.xVel;
      p.y += p.yVel;
      p.yVel += this.gravity;
      p.life -= 0.1;
      if (p.life < 0) this.particles.splice(a, 1);
    }
    if (this.particles.length) {
      requestAnimationFrame(() => this.animate());
    } else {
      this.animationRunning = false;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface IParticle {
  life?: number;
  xVel?: number;
  yVel?: number;
  size?: number;
  x?: number;
  y?: number;
  color?: string;
}
class Particle {
  life: number;
  xVel: number;
  yVel: number;
  size: number;
  x: number;
  y: number;
  color: string;

  constructor(options?: IParticle) {
    this.life = options?.life ?? 100;
    this.xVel = options?.xVel ?? 0;
    this.yVel = options?.yVel ?? 0;
    this.size = options?.size ?? 10;
    this.x = options?.x ?? 0;
    this.y = options?.y ?? 0;
    this.color = options?.color ?? 'red';
  }
}
