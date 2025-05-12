import { Component, computed, inject } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ArticleSummaryBarComponent } from "../../components/article-summary-bar/article-summary-bar.component";
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthDataService } from '../../services/auth-data.service';
import { DatePipe } from '@angular/common';

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
  private authData = inject(AuthDataService);

  lastLoaded: Date | null = null;
  articles = this.articleSvc.articles;
  articleStatus = this.articleSvc.articleStatus;

  private dp = new DatePipe('en-US');
  lastLoadedText = computed(() => {
    const ll = this.articleSvc.articleListLastLoaded();
    if (ll == null) return 'never';
    return this.dp.transform(ll, 'shortTime') ?? "never";
  })
  canEdit = computed(() => this.authData.roles().includes('dev'));

  btnAddArticle() {
    this.router.navigateByUrl('article-new')
  }
  btnReloadArticleList() {
    this.articleSvc.loadArticles();
  }
}
