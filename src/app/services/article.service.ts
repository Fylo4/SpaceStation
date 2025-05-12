import { inject, Injectable, signal } from '@angular/core';
import { UIArticle } from './api.types';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private api = inject(APIService);

  articles = signal<UIArticle[]>([]);
  articleStatus = signal<'initial' | 'success' | 'error' | 'loading'>('initial');
  articleListLastLoaded = signal<Date | null>(null);

  constructor() {
    this.loadArticles();
  }

  loadArticles() {
    this.articleStatus.set('loading');
    this.api.getArticleList().subscribe(v => {
      if (v !== false) {
        this.articles.set(v);
        this.articleStatus.set('success');
        this.articleListLastLoaded.set(new Date());
      }
      else {
        this.articleStatus.set('error');
      }
    })
  }
}

export const articleCompletionStatuses = ["seed", "draft", "in progress", "finished"];
export const articleTags = ["Christianity", "Life Systems"];
