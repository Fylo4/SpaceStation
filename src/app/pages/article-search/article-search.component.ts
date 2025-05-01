import { Component, inject } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ArticleSummaryBarComponent } from "../../components/article-summary-bar/article-summary-bar.component";
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrl: './article-search.component.scss',
  standalone: true,
  imports: [MatButtonModule, ArticleSummaryBarComponent],
})
export class ArticleSearchComponent {
  private articleSvc = inject(ArticleService);
  private router = inject(Router);

  articles = this.articleSvc.articles;

  canEdit = false;

  addArticle() {
    let uniqueSlugId = 1;
    while (this.articles.find(a => a.slug === 'article-'+uniqueSlugId)) {
      uniqueSlugId ++;
    }
    const mySlug = 'article-'+uniqueSlugId;
    this.articleSvc.articles.push({
      slug: mySlug,
      title: 'Article '+uniqueSlugId,
      content: '',
      tags: [],
      created: new DatePipe('en-US').transform(new Date(), 'shortDate') ?? '',
      edited: 'N/A',
      epistemicStatus: '',
      completionStatus: '',
    });
    this.router.navigateByUrl('article/' + mySlug + '?edit=true');
  }
}
