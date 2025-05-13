import { Component, inject, OnInit } from "@angular/core";
import { UIArticle } from "../../services/api.types";
import { ArticleEditorComponent } from "../../components/article-editor/article-editor.component";
import { APIService } from "../../services/api.service";
import { ActivatedRoute } from "@angular/router";
import { RoutePaths } from "../../app.routes";
import { BreadcrumbService } from "../../services/breadcrumb.service";
import { SnackbarService } from "../../../shared/services/snackbar.service";

@Component({
    selector: 'app-article-edit-page',
    templateUrl: './article-edit.page.html',
    styleUrl: './article-edit.page.scss',
    standalone: true,
    imports: [ArticleEditorComponent]
})
export class ArticleEditPage implements OnInit{
  private route = inject(ActivatedRoute);
  private api = inject(APIService);
  private breadcrumb = inject(BreadcrumbService);
  private snack = inject(SnackbarService);

  routePaths = RoutePaths;
  article?: UIArticle;

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

  save = () => {
    if (!this.article) return;
    this.api.updateArticle(this.article).subscribe(v => {
      if (v !== false) {
        console.log('Article updated successfully')
      }
    })
  }

  delete = () => {
    if (confirm(`Are you sure to delete ${this.article?.title ?? "this article"}?`)) {
      this.api.deleteArticle(this.article?.id ?? -1).subscribe(v => {
        if (v !== false) {
          this.breadcrumb.navigateAndAdd(RoutePaths.Research);
          this.snack.success("Article deleted");
        }
      })
    }
  }
}