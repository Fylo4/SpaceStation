import { Component, inject, OnInit } from "@angular/core";
import { UIArticle } from "../../services/api.types";
import { ArticleEditorComponent } from "../../components/article-editor/article-editor.component";
import { APIService } from "../../services/api.service";
import { ActivatedRoute } from "@angular/router";

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

}