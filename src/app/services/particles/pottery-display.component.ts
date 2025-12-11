import { Component, OnInit } from '@angular/core';
import { DataGenerator } from '../../services/data-generator';
import { DestructableDirective } from './destructable.directive';

@Component({
  selector: 'app-pottery-display',
  template: `
    <div style="width: 100%; display: flex; gap: 0.5rem 0.5rem; flex-wrap: wrap;">
      @for (vase of vases; track i; let i = $index) {
        @if (vase.broken) {
          <div style="width: 100px; height: 100px;"></div>
        } @else {
          <div
            style="width: 100px; height: 100px;"
            [style.background-color]="vase.color"
            [destructable]="vase.color"
            (destroyed)="vase.broken = true"></div>
        }
      }
    </div>
  `,
  styles: ``,
  standalone: true,
  imports: [DestructableDirective],
})
export class PotteryDisplayComponent implements OnInit {
  vases: { color: string; broken: boolean }[] = [];

  ngOnInit() {
    for (let a = 0; a < 20; a++) {
      this.vases.push({
        color: DataGenerator.Choose(['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'teal']),
        broken: false,
      });
    }
  }
}
