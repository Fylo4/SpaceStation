import { Component, input } from "@angular/core";
import { ArticleCommentAreaComponent } from "../article-comment-area.component";
import { DBArticle, UIArticle } from "../../services/api.types";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'app-article-renderer',
    templateUrl: './article-renderer.component.html',
    styleUrl: './article-renderer.component.scss',
    standalone: true,
    imports: [ArticleCommentAreaComponent, DatePipe]
})
export class ArticleRendererComponent {
    article = input.required<UIArticle>();
}