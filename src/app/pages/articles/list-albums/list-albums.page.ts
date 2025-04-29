import { Component } from "@angular/core";
import { ArticleCommentAreaComponent } from "../../../components/article-comment-area.component";

@Component({
    selector: 'app-list-albums-page',
    templateUrl: './list-albums.page.html',
    styleUrl: './list-albums.page.scss',
    standalone: true,
    imports: [ArticleCommentAreaComponent]
})
export class ListAlbumsPage {
    
}