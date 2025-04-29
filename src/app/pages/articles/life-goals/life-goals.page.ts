import { Component } from "@angular/core";
import { RoutePaths } from "../../../app.routes";
import { ArticleCommentAreaComponent } from "../../../components/article-comment-area.component";

@Component({
    selector: 'app-life-goals-page',
    templateUrl: 'life-goals.page.html',
    styleUrl: 'life-goals.page.scss',
    standalone: true,
    imports: [ArticleCommentAreaComponent]
})
export class LifeGoalsPage {
    routes = RoutePaths;
}