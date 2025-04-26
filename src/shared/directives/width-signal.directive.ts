import { AfterViewInit, Directive, ElementRef, HostListener, inject, signal } from '@angular/core';

@Directive({
  selector: '[widthSignal]',
})
export class WidthSignalDirective implements AfterViewInit {
  width = signal(0);

  private el = inject(ElementRef);

  private reloadWidth() {
    this.width.set(this.el.nativeElement.clientWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.reloadWidth();
  }

  ngAfterViewInit() {
    this.reloadWidth();

    // Every 15 seconds re-check the element's width
    setInterval(() => this.reloadWidth, 1000 * 15);
  }
}
