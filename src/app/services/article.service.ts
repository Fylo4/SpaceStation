import { Injectable } from '@angular/core';
import articlesJson from './articles.json';
import { downloadFile } from '../../shared/services/download-file';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = articlesJson;

  getArticleBySlug(slug: string | null): Article | undefined {
    return this.articles.find(a => a.slug.toLowerCase() === slug?.toLowerCase());
  }

  downloadAllArticles(newArticle?: Article) {
    const content = JSON.stringify(this.articles);
    downloadFile(content, "articles.json");
  }
}

export const articleCompletionStatuses = ["seed", "draft", "in progress", "finished"];
export const articleTags = ["Christianity", "Life Systems"];

export type Article = {
  slug: string;
  title: string;
  content: string;
  tags: string[];
  created: string;
  edited: string;
  // A sentence or two describing how the author came to know what they know, how much effort into research, how they validated, and certainty level
  epistemicStatus: string;
  completionStatus: string;
  // Other metadata: Content warnings, importance levels
  // TODO Add a description page on what all the metadata means
};
