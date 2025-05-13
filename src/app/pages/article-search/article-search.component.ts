import { Component, computed, inject, signal } from '@angular/core';
import { articleCompletionStatuses, ArticleService, articleTags } from '../../services/article.service';
import { ArticleSummaryBarComponent } from "../../components/article-summary-bar/article-summary-bar.component";
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { AuthDataService } from '../../services/auth-data.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { trigger } from '@angular/animations';
import { collapseTransitionY } from '../../../shared/component-library/transitions';

@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrl: './article-search.component.scss',
  standalone: true,
  imports: [MatButtonModule, ArticleSummaryBarComponent, MatRadioModule, FormsModule, MatFormFieldModule, MatInputModule],
  animations: [trigger('collapse', collapseTransitionY(250))],
})
export class ArticleSearchComponent {
  private articleSvc = inject(ArticleService);
  private router = inject(Router);
  private authData = inject(AuthDataService);

  articles = this.articleSvc.articles;
  articleStatus = this.articleSvc.articleStatus;
  tags = articleTags;
  statuses = articleCompletionStatuses;

  lastLoaded: Date | null = null;
  sortBy = signal<"edited" | "status" | "title">("edited");
  sortDir = signal<1 | -1>(-1);
  filterTag = signal<string | null>(null);
  filterStatus = signal<string | null>(null);
  filterTitle = signal<string>('');
  searchPanelOpen = signal(false);

  articlesFiltered = computed(() => {
    let ret = this.articles().slice();
    const ft = this.filterTag();
    const fs = this.filterStatus();
    const title = this.filterTitle().trim().toLowerCase();

    if (ft != null) ret = ret.filter(a => a.tags?.includes(ft));
    if (fs != null) ret = ret.filter(a => a.completionstatus === fs);
    if (title != '') ret = ret.filter(a => a.title.toLowerCase().includes(title));

    return ret;
  })

  articlesSorted = computed(() => {
    const sd = this.sortDir(); // For brevity
    const ret = this.articlesFiltered().slice();

    switch (this.sortBy()) {
      case 'edited':
        ret.sort((a, b) => {
          if (b.edited == null) return sd;
          if (a.edited == null) return -sd;
          return (a.edited.valueOf() > b.edited.valueOf() ? 1 : -1) * sd;
        })
        break;
      case 'title':
        ret.sort((a, b) => (a.title < b.title ? -1 : 1)*sd)
        break;
      case 'status':
        ret.sort((a, b) => {
          const aPos = articleCompletionStatuses.indexOf(a.completionstatus??'');
          const bPos = articleCompletionStatuses.indexOf(b.completionstatus??'');
          if (aPos < 0 && bPos < 0) return (a.completionstatus??'') < (b.completionstatus??'') ? sd : -sd;
          if (aPos < 0) return sd;
          if (bPos < 0) return -sd;
          return aPos > bPos ? sd : -sd;
        })
        break;
    }
    return ret;
  })

  private dp = new DatePipe('en-US');
  lastLoadedText = computed(() => {
    const ll = this.articleSvc.articleListLastLoaded();
    if (ll == null) return 'never';
    return this.dp.transform(ll, 'shortTime') ?? "never";
  })
  canEdit = computed(() => this.authData.roles().includes('dev'));


  btnSelectTag(tag: string) {
    if (this.filterTag() === tag) this.filterTag.set(null);
    else this.filterTag.set(tag);
  }
  btnSelectStatus(status: string) {
    if (this.filterStatus() === status) this.filterStatus.set(null);
    else this.filterStatus.set(status);
  }

  btnAddArticle() {
    this.router.navigateByUrl('article-new')
  }
  btnReloadArticleList() {
    this.articleSvc.loadArticles();
  }

  btnCloseSearchPanel() {
    this.searchPanelOpen.set(false);
  }
  btnOpenSearchPanel() {
    this.searchPanelOpen.set(true);
  }
}
