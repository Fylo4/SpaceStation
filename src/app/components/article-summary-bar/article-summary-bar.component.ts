import { Component, inject, input } from "@angular/core";
import { Router } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { UIArticle } from "../../services/api.types";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'app-article-summary-bar',
    templateUrl: './article-summary-bar.component.html',
    styleUrl: './article-summary-bar.component.scss',
    standalone: true,
    imports: [MatButtonModule, DatePipe]
})
export class ArticleSummaryBarComponent {
  private router = inject(Router);
    
  article = input.required<UIArticle>();
  canEdit = input<boolean>(false);
    
  navigateToArticle(slug: string) {
    this.router.navigateByUrl('article/' + slug);
  }
  navigateToEditArticle(slug: string) {
    // this.router.navigateByUrl('article/' + slug + '?edit=true');
    this.router.navigateByUrl('article-edit/' + slug);
  }
}