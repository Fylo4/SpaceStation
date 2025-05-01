import { Component, inject, input } from "@angular/core";
import { Article } from "../../services/article.service";
import { JoinPipe } from "../../../shared/pipes/join.pipe";
import { Router } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'app-article-summary-bar',
    templateUrl: './article-summary-bar.component.html',
    styleUrl: './article-summary-bar.component.scss',
    standalone: true,
    imports: [MatButtonModule, JoinPipe]
})
export class ArticleSummaryBarComponent {
  private router = inject(Router);
    
  article = input.required<Article>();
  canEdit = input<boolean>(false);
    
  navigateToArticle(slug: string) {
    this.router.navigateByUrl('article/' + slug);
  }
  navigateToEditArticle(slug: string) {
    this.router.navigateByUrl('article/' + slug + '?edit=true');
  }
}