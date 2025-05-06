import { Component, computed, inject } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ArticleSummaryBarComponent } from "../../components/article-summary-bar/article-summary-bar.component";
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthDataService } from '../../services/auth-data.service';

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

  articles = this.articleSvc.articles;
  articleStatus = this.articleSvc.articleStatus;

  canEdit = computed(() => this.authData.roles().includes('dev'));

  btnAddArticle() {
    this.router.navigateByUrl('article-new')
  }
}
