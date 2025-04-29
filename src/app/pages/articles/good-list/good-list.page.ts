import { Component } from "@angular/core";
import { ArticleCommentAreaComponent } from "../../../components/article-comment-area.component";

@Component({
    selector: 'app-good-list-page',
    templateUrl: 'good-list.page.html',
    styleUrl: 'good-list.page.scss',
    standalone: true,
    imports: [ArticleCommentAreaComponent]
})
export class GoodListPage {

}