import { Component } from "@angular/core";
import { RoutePaths } from "../../../app.routes";
import { ArticleCommentAreaComponent } from "../../../components/article-comment-area.component";

@Component({
    selector: 'app-life-systems-page',
    templateUrl: './life-systems.page.html',
    styleUrl: './life-systems.page.scss',
    standalone: true,
    imports: [ArticleCommentAreaComponent]
})
export class LifeSystemsPage {
    routes = RoutePaths;
}