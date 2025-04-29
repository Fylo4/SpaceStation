import { Component } from "@angular/core";
import { RoutePaths } from "../../../app.routes";
import { ArticleCommentAreaComponent } from "../../../components/article-comment-area.component";

@Component({
    selector: 'app-beliefs-page',
    templateUrl: 'beliefs.page.html',
    styleUrl: 'beliefs.page.scss',
    standalone: true,
    imports: [ArticleCommentAreaComponent]
})
export class BeliefsPage {
    routes = RoutePaths;
}