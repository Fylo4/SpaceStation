import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TopnavmenuComponent } from '../shared/component-library/topnavmenu/topnavmenu.component';
import { MenuItem } from '../shared/component-library/topnavmenu/menu-item.type';
import { RoutePaths } from './app.routes';
import { BreadcrumbService } from './services/breadcrumb.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    TopnavmenuComponent,
    MatIconModule,
    CommonModule,
    MatMenuModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private router = inject(Router);
  bread = inject(BreadcrumbService);

  MenuItems: MenuItem[] = [
    // {
    //   Type: 'Link',
    //   Text: 'Home',
    //   Icon: 'home',
    //   Link: [`/${RoutePaths.Home}`],
    // },
  ];

  titleClick() {
    this.bread.clear();
    this.router.navigate([RoutePaths.Home]);
  }
}
