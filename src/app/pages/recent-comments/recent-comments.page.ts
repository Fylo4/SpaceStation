import { Component } from "@angular/core";
import { RoutePaths } from "../../app.routes";
import { CommentAreaComponent } from "../../components/comment-area/comment-area.component";

@Component({
    selector: 'app-recent-comments-page',
    templateUrl: 'recent-comments.page.html',
    styleUrl: 'recent-comments.page.scss',
    standalone: true,
    imports: [CommentAreaComponent]
})
export class RecentCommentsPage {
    routes = RoutePaths;
}