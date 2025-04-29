import { Component } from "@angular/core";
import { ArticleCommentAreaComponent } from "../../../components/article-comment-area.component";

@Component({
    selector: 'app-my-system-page',
    templateUrl: 'my-system.page.html',
    styleUrl: 'my-system.page.scss',
    standalone: true,
    imports: [ArticleCommentAreaComponent]
})
export class MySystemPage {

}