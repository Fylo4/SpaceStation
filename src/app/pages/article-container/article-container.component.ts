import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article, ArticleService } from '../../services/article.service';
import { ArticleRendererComponent } from "../../components/article-renderer/article-renderer.component";
import { ArticleEditorComponent } from "../../components/article-editor/article-editor.component";

@Component({
  selector: 'app-article-container',
  templateUrl: './article-container.component.html',
  styleUrl: './article-container.component.scss',
  standalone: true,
  imports: [ArticleRendererComponent, ArticleEditorComponent],
})
export class ArticleContainerComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private articleSvc = inject(ArticleService);

  article: Article | undefined;
  isEditing = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      this.article = this.articleSvc.getArticleBySlug(slug);
    });
    this.route.queryParamMap.subscribe(params => {
      this.isEditing = !!params.get('edit');
    })
  }
}
