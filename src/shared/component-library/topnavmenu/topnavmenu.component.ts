import {
  Component,
  HostListener,
  OnInit,
  Signal,
  computed,
  inject,
  input,
  isSignal,
  output,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from '../../services/theme.service';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { trigger } from '@angular/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { fadeTransition, IconSpinnerTransition, collapseTransitionY, collapseTransitionX } from '../transitions';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MenuItem } from './menu-item.type';
import { SignalValuePipe } from './signal-value.pipe';
import { GenericMenuModule } from '../generic-menu/generic-menu';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-topnavmenu',
  styleUrls: ['topnavmenu.component.scss'],
  templateUrl: 'topnavmenu.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatTooltipModule,
    MatMenuModule,
    MatSlideToggleModule,
    FormsModule,
    MatToolbarModule,
    CdkMenuModule,
    SignalValuePipe,
    GenericMenuModule,
    MatSelectModule,
  ],
  animations: [
    trigger('collapseX', collapseTransitionX(300)),
    trigger('fade', fadeTransition(200)),
    trigger('iconspinner', IconSpinnerTransition(100)),
    trigger('collapse', collapseTransitionY(200)),
  ],
})
export class TopnavmenuComponent implements OnInit {
  private router = inject(Router);
  themeSvc = inject(ThemeService);

  middleItems = input<MenuItem[]>([]);
  rightItems = input<MenuItem[]>([]);
  title = input<string>('');

  titleClick = output<void>();

  SidePanelMode = signal(false);
  SideMenuOpen = signal(false);

  middleItemsVisible = computed(() =>
    this.middleItems()
      .filter(item => this.filterVisible(item.Visible))
      .map(subitem => this.mapNoInvChildren(subitem))
  );
  rightItemsVisible = computed(() =>
    this.rightItems()
      .filter(item => this.filterVisible(item.Visible))
      .map(subitem => this.mapNoInvChildren(subitem))
  );

  ngOnInit() {
    setTimeout(() => this.SidePanelMode.set(this.TestWraps()));
    this.SetSubmenusToClosed();
  }

  // TODO Flatten menus with only one visible item
  private filterVisible = (
    input: boolean | Signal<boolean> | null | undefined
  ): boolean => {
    // No visible variable given = Visible
    if (input == null) return true;
    if (typeof input == 'boolean') return input;
    if (isSignal(input)) return input();
    return true;
  };

  private mapNoInvChildren = (input: MenuItem): MenuItem => {
    if (input.Type != 'Menu') return input;
    // If we're a menu, remove any children that are invisible
    // Also call this same map to process child menus
    return {
      ...input,
      Submenus: input.Submenus.filter(item => this.filterVisible(item.Visible)).map(subitem =>
        this.mapNoInvChildren(subitem)
      ),
    };
  };

  HandleItemClick(item: MenuItem, data?: unknown) {
    // Make sure the button isn't disabled!
    if (!!item.Disabled && (item.Disabled === true || item.Disabled() === true)) {
      return;
    }
    // Each type has its own way of handling clicks
    switch (item.Type) {
      case 'Link': {
        const newroute = Array.isArray(item.Link) ? item.Link : [item.Link];
        this.router.navigate(newroute);
        // Close sidemenu and submenus on navigation
        this.SideMenuOpen.set(false);
        this.SetSubmenusToClosed();
        break;
      }
      case 'Action': {
        item.Action();
        break;
      }
      case 'Checkbox':
      case 'IconToggle': {
        const currentVal = isSignal(item.Value) ? item.Value() : item.Value;
        if (item.Change) item.Change(!currentVal);
        break;
      }
      case 'Select': {
        if (item.Change) item.Change(data);
        break;
      }
      case 'Menu': {
        item.SubmenuOpen = !item.SubmenuOpen;
        break;
      }
    }
  }

  OpenSideMenu() {
    this.SideMenuOpen.set(true);
  }
  CloseSideMenu() {
    this.SideMenuOpen.set(false);
  }
  ToggleSideMenu() {
    this.SideMenuOpen.set(!this.SideMenuOpen());
  }

  SidemenuItemKeyup(item: MenuItem, event: KeyboardEvent) {
    console.log(event.key);
    if (event.key === 'enter' || event.key === 'space') {
      this.HandleItemClick(item);
    }
  }

  private SetSubmenusToClosed(item?: MenuItem) {
    if (item == null) {
      this.middleItems().forEach(i => this.SetSubmenusToClosed(i));
      this.rightItems().forEach(i => this.SetSubmenusToClosed(i));
    } else if (item.Type == 'Menu') {
      item.SubmenuOpen = false;
      item.Submenus.forEach(i => this.SetSubmenusToClosed(i));
    }
  }

  private prevWidth = window.innerWidth;
  @HostListener('window:resize', ['$event'])
  onResize() {
    const spm = this.SidePanelMode();
    if (window.innerWidth > this.prevWidth) {
      // Window grew; test if the navbar will fit in full-width
      if (spm) {
        this.SidePanelMode.set(false);
        setTimeout(() => {
          this.SidePanelMode.set(this.TestWraps());
          if (!this.SidePanelMode()) this.SideMenuOpen.set(false);
        });
      }
    } else {
      // Window didn't grow; Check if the navbar wrapped
      if (!this.SidePanelMode()) {
        this.SidePanelMode.set(this.TestWraps());
      }
    }
    this.prevWidth = window.innerWidth;
  }

  // Returns true if the navbar wrapped into multi-line, false otherwise
  private TestWraps(): boolean {
    // Test to see if any flex-row with class 'test-wrap' has wrapped
    const wrapElements = document.getElementsByClassName('_TNM-test-wrap');

    for (let a = 0; a < wrapElements.length; a++) {
      // 'item' is the flex-row with 'test-wrap'
      const item = wrapElements.item(a);
      if (!item) continue;

      const children = item.children;
      // Compare the first and last children's y-position; if there is a difference, it probably wrapped
      const firstItem = children.item(0);
      const lastItem = children.item(item.children.length - 1);
      if (firstItem && lastItem) {
        const firstTop = firstItem.getBoundingClientRect().top;
        const lastTop = lastItem.getBoundingClientRect().top;
        // 5 pixels of tolerance in case buttons are different heights
        if (Math.abs(firstTop - lastTop) > 5) {
          return true;
        }
      }
    }
    return false;
  }
}
