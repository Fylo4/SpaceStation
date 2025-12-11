import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-draw-machine',
  templateUrl: './draw-machine.component.html',
  styles: `
    .draw-machine-title {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  `,
  standalone: true,
  imports: [FormsModule],
})
export class DrawMachineComponent implements AfterViewInit {
  drawCanvas = viewChild.required<ElementRef<HTMLCanvasElement>>('drawCanvas');
  machineCanvas = viewChild.required<ElementRef<HTMLCanvasElement>>('machineCanvas');

  prevPoint: Point | undefined = undefined;
  arms: DrawArm[] = [
    { speed: 0.102, angle: 0, length: 100 },
    { speed: 0.202, angle: 0, length: 67 },
    { speed: 0.302, angle: 0, length: 33 },
  ];

  private run = true;
  interval = 20;
  stepMultiplier = 1;

  doDrawMachine = true;
  machineColor = 'rgb(128, 0, 0)';
  machineStroke = 1;
  machineJointColor = 'rgb(187, 0, 0)';
  machineJointStroke = 1;
  pencilColor = 'rgb(12, 137, 14)';
  pencilStroke = 1;
  canvasSize = 500;
  bgColor = 'white';

  ngAfterViewInit(): void {
    this.drawMachine();
  }

  btnStartSim() {
    this.run = true;
    this.step();
  }
  btnPauseSim() {
    this.run = false;
  }
  btnResetSim() {
    this.arms.forEach(a => (a.angle = 0));
    this.clear(this.drawCanvas());
    this.prevPoint = undefined;
    if (this.doDrawMachine) this.drawMachine();
  }
  btnDeleteArm(index: number) {
    this.arms.splice(index, 1);
    if (this.doDrawMachine) this.drawMachine();
  }
  btnAddArm() {
    this.arms.push({ length: 50, speed: 1, angle: 0 });
    if (this.doDrawMachine) this.drawMachine();
  }

  onDrawMachineChange() {
    this.clear(this.machineCanvas());
    if (this.doDrawMachine) this.drawMachine();
  }

  private step() {
    for (let a = 0; a < this.stepMultiplier; a++) {
      this.drawNewLine();
      this.stepArms();
    }
    if (this.doDrawMachine) this.drawMachine();

    // Continue simulation
    if (this.run) {
      setTimeout(() => this.step(), this.interval);
    }
  }

  private drawNewLine() {
    // Find position of the new point
    const newPoint: Point = { x: this.canvasSize / 2, y: this.canvasSize / 2 };
    this.arms.forEach(arm => {
      newPoint.x += Math.cos(arm.angle) * arm.length;
      newPoint.y += Math.sin(arm.angle) * arm.length;
    });
    // Draw line
    if (this.prevPoint != null) {
      this.drawLine(this.drawCanvas(), this.prevPoint, newPoint, this.pencilColor, this.pencilStroke);
    }
    this.prevPoint = newPoint;
  }

  private drawMachine() {
    if (!this.doDrawMachine) return;
    // Find position of the new point
    const newPoint: Point = { x: this.canvasSize / 2, y: this.canvasSize / 2 };
    this.clear(this.machineCanvas());
    this.arms.forEach(arm => {
      const armStart = { ...newPoint };
      // Calculate position
      newPoint.x += Math.cos(arm.angle) * arm.length;
      newPoint.y += Math.sin(arm.angle) * arm.length;
      // Draw the arm
      this.drawLine(this.machineCanvas(), armStart, newPoint, this.machineColor, this.machineStroke);
      this.drawEllipse(this.machineCanvas(), armStart, 5, this.machineJointColor, this.machineJointStroke);
    });
  }

  private stepArms() {
    this.arms.forEach(arm => {
      arm.angle += arm.speed;
      if (arm.angle > Math.PI * 2) arm.angle -= Math.PI * 2;
      if (arm.angle < 0) arm.angle += Math.PI * 2;
    });
  }

  private drawLine(canvas: ElementRef<HTMLCanvasElement>, point1: Point, point2: Point, color: string, width: number) {
    const ctx = canvas.nativeElement.getContext('2d');
    if (ctx == null) return;
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  }
  private drawEllipse(
    canvas: ElementRef<HTMLCanvasElement>,
    point: Point,
    radius: number,
    color: string,
    width: number
  ) {
    const ctx = canvas.nativeElement.getContext('2d');
    if (ctx == null) return;
    ctx.beginPath();
    ctx.ellipse(point.x, point.y, radius, radius, 0, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  }

  private clear(canvas: ElementRef<HTMLCanvasElement>) {
    const ctx = canvas.nativeElement.getContext('2d');
    if (ctx == null) return;
    ctx.clearRect(0, 0, canvas.nativeElement.width, canvas.nativeElement.height);
  }
}

type DrawArm = {
  speed: number;
  angle: number;
  length: number;
};
type Point = { x: number; y: number };
