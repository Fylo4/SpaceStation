import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleRendererComponent } from "../../components/article-renderer/article-renderer.component";
import { APIService } from '../../services/api.service';
import { UIArticle } from '../../services/api.types';

@Component({
  selector: 'app-article-container',
  templateUrl: './article-container.component.html',
  styleUrl: './article-container.component.scss',
  standalone: true,
  imports: [ArticleRendererComponent],
})
export class ArticleContainerComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(APIService);

  article: UIArticle | undefined;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      this.api.getArticleBySlug(slug ?? '').subscribe(v => {
        if (v !== false) {
          this.article = v;
        }
      });
    });
  }
}
