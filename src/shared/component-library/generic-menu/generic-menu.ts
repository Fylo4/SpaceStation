import {
  contentChildren,
  Directive,
  ElementRef,
  Host,
  HostListener,
  inject,
  input,
  NgModule,
  OnInit,
  Optional,
  output,
  signal,
} from '@angular/core';

/* Why did I make generic-menu when CdkMenu exists?
 * Apparently, with CdkMenu there's no way to specify that a menu item doesn't
 *   close the menu when you click it. So for instance the menu would close every
 *   time you press the dark mode toggle. So I basically just rewrote CdkMenu for that.
 *
 * Each GenericMenuItem needs to have a unique id!
 * TODO Add aria roles
 */

@Directive({
  selector: '[GenericMenuTriggerFor]',
})
export class GenericMenuTriggerDirective {
  menu = input.required<GenericMenuDirective>({ alias: 'GenericMenuTriggerFor' });

  private ElementRef = inject(ElementRef);
  private hasFocus = false;

  // Apparently this also picks up space and enter events
  @HostListener('click')
  private toggleMenu() {
    this.menu().toggleOpen();
  }
  @HostListener('focus') onFocus() {
    this.hasFocus = true;
  }
  @HostListener('blur') onblur() {
    this.hasFocus = false;
  }
  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.menu().closeMenu();
    }

    if (!this.hasFocus || !this.menu().isOpen()) return;
    let action = false;
    switch (event.key) {
      case 'ArrowDown':
        this.menu().selectNext();
        action = true;
        break;
      case 'ArrowUp':
        this.menu().selectPrevious();
        action = true;
        break;
      case 'Enter':
      case ' ':
        this.menu().activateSelected(true, false);
        action = true;
        break;
      case 'Tab':
        this.menu().closeMenu();
        break;
    }
    if (action) {
      event.stopPropagation();
      event.preventDefault();
    }
  }
}

@Directive({
  selector: '[GenericMenuItem]',
})
export class GenericMenuItemDirective implements OnInit {
  disabled = input(false);
  closeMenuOnKeyboardEvent = input(true);
  closeMenuOnMouseEvent = input(true);
  activated = output<void>();

  ElementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private parentMenu?: GenericMenuDirective;

  ngOnInit(): void {
    this.ElementRef.nativeElement.classList.add('generic-menu-item');
  }

  constructor(@Optional() @Host() private _parentMenu: GenericMenuDirective) {
    this.parentMenu = this._parentMenu;
  }

  @HostListener('click', ['$event'])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleClick(event: MouseEvent) {
    this.activate(false, true);
  }

  activate(isKeyboard = false, isMouse = false) {
    if (!this.disabled()) {
      this.activated.emit();
      if ((isKeyboard && this.closeMenuOnKeyboardEvent()) || (isMouse && this.closeMenuOnMouseEvent())) {
        this.closeMenu();
      }
    }
  }

  private closeMenu() {
    this.parentMenu?.closeMenu();
  }
}

@Directive({
  selector: '[GenericMenu]',
  exportAs: 'GenericMenu',
})
export class GenericMenuDirective implements OnInit {
  menuItems = contentChildren(GenericMenuItemDirective, { descendants: true });
  isOpen = signal(false);

  private selectedId = '';

  ElementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  ngOnInit(): void {
    this.ElementRef.nativeElement.classList.add('generic-menu');
  }

  private getId = (item: GenericMenuItemDirective) => item.ElementRef.nativeElement.id;

  activateSelected(isKeyboard = false, isMouse = false) {
    const currentItem = this.menuItems().find(i => this.getId(i) === this.selectedId);
    currentItem?.activate(isKeyboard, isMouse);
  }

  selectFirst() {
    this.selectedId = this.menuItems()[0].ElementRef.nativeElement.id;
    this.updateActiveElement();
  }
  selectLast() {
    this.selectedId = this.getId(this.menuItems()[this.menuItems().length - 1]);
    this.updateActiveElement();
  }
  selectNext() {
    const currentIndex = this.menuItems().findIndex(i => this.getId(i) === this.selectedId);
    if (this.menuItems().length) {
      if (currentIndex >= this.menuItems().length - 1 || currentIndex == -1) {
        this.selectFirst();
      } else {
        this.selectedId = this.getId(this.menuItems()[currentIndex + 1]);
      }
    }
    this.updateActiveElement();
  }
  selectPrevious() {
    const currentIndex = this.menuItems().findIndex(i => this.getId(i) === this.selectedId);
    if (this.menuItems().length) {
      if (currentIndex <= 0) {
        this.selectLast();
      } else {
        this.selectedId = this.getId(this.menuItems()[currentIndex - 1]);
      }
    }
    this.updateActiveElement();
  }

  toggleOpen() {
    this.isOpen.set(!this.isOpen());
    this.updateActiveElement();
  }
  closeMenu() {
    this.isOpen.set(false);
    this.updateActiveElement();
  }

  private updateActiveElement() {
    this.menuItems().forEach(item => {
      if (this.getId(item) === this.selectedId) {
        item.ElementRef.nativeElement.classList.add('selected');
      } else {
        item.ElementRef.nativeElement.classList.remove('selected');
      }
    });
  }
}

@NgModule({
  imports: [GenericMenuDirective, GenericMenuItemDirective, GenericMenuTriggerDirective],
  exports: [GenericMenuDirective, GenericMenuItemDirective, GenericMenuTriggerDirective],
})
export class GenericMenuModule {}
