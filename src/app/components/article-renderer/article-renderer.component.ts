import { Component, input } from "@angular/core";
import { Article } from "../../services/article.service";
import { ArticleCommentAreaComponent } from "../article-comment-area.component";
import { JoinPipe } from "../../../shared/pipes/join.pipe";

@Component({
    selector: 'app-article-renderer',
    templateUrl: './article-renderer.component.html',
    styleUrl: './article-renderer.component.scss',
    standalone: true,
    imports: [ArticleCommentAreaComponent, JoinPipe]
})
export class ArticleRendererComponent {
    article = input.required<Article >();
}