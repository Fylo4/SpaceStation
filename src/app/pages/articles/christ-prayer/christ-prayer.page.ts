import { Component } from "@angular/core";
import { FakeLinkComponent } from "../../../components/fake-link.component";
import { RoutePaths } from "../../../app.routes";
import { ArticleCommentAreaComponent } from "../../../components/article-comment-area.component";

@Component({
    selector: 'app-christ-prayer-page',
    templateUrl: 'christ-prayer.page.html',
    styleUrl: 'christ-prayer.page.scss',
    standalone: true,
    imports: [FakeLinkComponent, ArticleCommentAreaComponent]
})
export class ChristPrayerPage {
    routes = RoutePaths;
}