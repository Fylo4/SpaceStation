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

  constructor() {
    this.loadArticles();
  }

  private loadArticles() {
    this.articleStatus.set('loading');
    this.api.getArticleList().subscribe(v => {
      if (v !== false) {
        this.articles.set(v);
        this.articleStatus.set('success');
      }
      else {
        this.articleStatus.set('error');
      }
    })
  }
}

export const articleCompletionStatuses = ["seed", "draft", "in progress", "finished"];
export const articleTags = ["Christianity", "Life Systems"];
