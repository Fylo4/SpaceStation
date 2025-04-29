import { Component } from "@angular/core";
import { RoutePaths } from "../../app.routes";
import { CommentAreaComponent } from "../../components/comment-area/comment-area.component";

@Component({
    selector: 'app-comms-page',
    templateUrl: 'comms.page.html',
    styleUrl: 'comms.page.scss',
    standalone: true,
    imports: [CommentAreaComponent]
})
export class CommsPage {
    routes = RoutePaths;
}