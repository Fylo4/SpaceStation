import { Component } from "@angular/core";
import { FakeLinkComponent } from "../../../components/fake-link.component";
import { RoutePaths } from "../../../app.routes";
import { ArticleCommentAreaComponent } from "../../../components/article-comment-area.component";

@Component({
    selector: 'app-selflessness-page',
    templateUrl: './selflessness.page.html',
    styleUrl: './selflessness.page.scss',
    standalone: true,
    imports: [FakeLinkComponent, ArticleCommentAreaComponent]
})
export class SelflessnessPage {
    routes = RoutePaths;
}