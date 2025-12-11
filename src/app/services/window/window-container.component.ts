import { trigger } from '@angular/animations';
import { Component, OnInit, signal } from '@angular/core';
import { fadeTransition } from '../transitions';

@Component({
  selector: 'app-window-container',
  templateUrl: './window-container.component.html',
  styleUrl: './window-container.component.scss',
  standalone: true,
  imports: [],
  animations: [trigger('fade', fadeTransition(200))],
})
export class WindowContainerComponent implements OnInit {
  defaultFriction = 0.1;
  private mouseLastMoved = Date.now();

  // Every time we make a new dialog, increment the id
  private currentIdIndex = 0;
  openWindows: InstantiatedWindow[] = [];

  private isGrabbing = signal<number | undefined>(undefined);
  private isResizing = signal<number | undefined>(undefined);
  // Up, down, left, right
  private resizeDirection = signal<'u' | 'd' | 'l' | 'r' | 'ul' | 'ur' | 'dl' | 'dr'>('u');
  private runningAnimationLoop = false;

  ngOnInit(): void {
    this.initiateEventListeners();
    // Start the movement animation
    this.createWindow({
      title: 'Test Window',
    });
  }

  private initiateEventListeners() {
    document.addEventListener('mousemove', (ev: MouseEvent) => {
      this.mouseLastMoved = Date.now();
      // Grabbing / Moving logic
      if (this.isGrabbing() != undefined) {
        const thisWindow = this.openWindows.find(d => d.id == this.isGrabbing());
        if (thisWindow) {
          thisWindow.x += ev.movementX;
          thisWindow.y += ev.movementY;

          thisWindow.xVel = ev.movementX;
          thisWindow.yVel = ev.movementY;

          this.checkDialogCoords(thisWindow);
        }
      }
      // Resizing logic
      if (this.isResizing() != undefined) {
        const thisWindow = this.openWindows.find(d => d.id == this.isResizing());
        if (thisWindow) {
          if (this.resizeDirection().includes('u')) {
            const minusHeight = Math.min(ev.movementY, thisWindow.height - 50);
            thisWindow.y += minusHeight;
            thisWindow.height -= minusHeight;
          }
          if (this.resizeDirection().includes('d')) {
            const plusHeight = Math.max(ev.movementY, 50 - thisWindow.height);
            thisWindow.height += plusHeight;
          }
          if (this.resizeDirection().includes('l')) {
            const minusWidth = Math.min(ev.movementX, thisWindow.width - 150);
            thisWindow.x += minusWidth;
            thisWindow.width -= minusWidth;
          }
          if (this.resizeDirection().includes('r')) {
            const plusWidth = Math.max(ev.movementX, 150 - thisWindow.width);
            thisWindow.width += plusWidth;
          }

          this.checkDialogCoords(thisWindow);
        }
      }
    });
    document.addEventListener('mouseleave', () => {
      this.isGrabbing.set(undefined);
      this.isResizing.set(undefined);
    });
    document.addEventListener('mouseup', () => {
      // Grabbing / Moving logic
      if (this.isGrabbing() != undefined) {
        // If we were grabbing a dialog, if we aren't dragging it, cancel its momentum
        if (Date.now() - this.mouseLastMoved > 50) {
          const dlgGrabbed = this.openWindows.find(d => d.id == this.isGrabbing());
          if (dlgGrabbed) {
            dlgGrabbed.xVel = 0;
            dlgGrabbed.yVel = 0;
          }
        }

        this.isGrabbing.set(undefined);
        this.attemptStartAnimation();
      }
      // Resizing logic
      if (this.isResizing() != undefined) {
        this.isResizing.set(undefined);
      }
    });
  }

  createWindow(options?: WindowOptions) {
    const newWindow: InstantiatedWindow = {
      id: this.currentIdIndex,
      title: options?.title ?? '',
      hidden: false,
      width: options?.width ?? 200,
      height: options?.height ?? 200,
      x: 500,
      y: 500,
      xVel: 0,
      yVel: 0,
    };
    this.checkDialogCoords(newWindow);
    this.openWindows.push(newWindow);
  }

  btnDialogClose(id: number) {
    const index = this.openWindows.findIndex(x => x.id == id);
    if (index >= 0) this.openWindows.splice(index, 1);
  }
  btnDialogMinus(id: number) {
    const dlg = this.openWindows.find(x => x.id == id);
    if (dlg) dlg.hidden = true;
  }

  private attemptStartAnimation() {
    if (!this.runningAnimationLoop) this.animationStep();
  }

  private animationStep() {
    this.runningAnimationLoop = true;
    let anyMoved = false;
    this.openWindows.forEach(w => {
      // Don't move the currently grabbed box
      if (w.id != this.isGrabbing() && (w.xVel != 0 || w.yVel != 0)) {
        w.x += w.xVel;
        w.y += w.yVel;
        w.xVel *= 1 - (w.friction ?? this.defaultFriction);
        w.yVel *= 1 - (w.friction ?? this.defaultFriction);
        if (Math.abs(w.xVel) < 0.1) w.xVel = 0;
        if (Math.abs(w.yVel) < 0.1) w.yVel = 0;
        this.checkDialogCoords(w);
        anyMoved = true;
      }
    });
    // If nothing moved, then stop requesting animation frames
    if (anyMoved) requestAnimationFrame(() => this.animationStep());
    else this.runningAnimationLoop = false;
  }

  private checkDialogCoords(w: InstantiatedWindow) {
    if (w.x + w.width > window.innerWidth) {
      w.x = window.innerWidth - w.width;
      if (w.xVel > 0) w.xVel = -w.xVel;
    }
    if (w.y + w.height > window.innerHeight) {
      w.y = window.innerHeight - w.height;
      if (w.yVel > 0) w.yVel = -w.yVel;
    }
    if (w.x < 0) {
      w.x = 0;
      if (w.xVel < 0) w.xVel = -w.xVel;
    }
    if (w.y < 0) {
      w.y = 0;
      if (w.yVel < 0) w.yVel = -w.yVel;
    }
  }

  startDragging(myId: number) {
    this.isGrabbing.set(myId);
  }
  startResizing(myId: number, direction?: 'u' | 'd' | 'l' | 'r' | 'ul' | 'ur' | 'dl' | 'dr') {
    this.isGrabbing.set(undefined);
    this.isResizing.set(myId);
    this.resizeDirection.set(direction ?? 'u');
  }
}

type InstantiatedWindow = {
  id: number;
  title: string;
  hidden: boolean;

  width: number;
  height: number;
  x: number;
  y: number;
  xVel: number;
  yVel: number;
  friction?: number;
};

export type WindowOptions = {
  width?: number;
  height?: number;
  title?: string;
  friction?: number;
};
