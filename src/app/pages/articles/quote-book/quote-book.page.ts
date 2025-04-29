import { Component } from "@angular/core";
import { ArticleCommentAreaComponent } from "../../../components/article-comment-area.component";

@Component({
    selector: 'app-quote-book-page',
    templateUrl: 'quote-book.page.html',
    styleUrl: 'quote-book.page.scss',
    standalone: true,
    imports: [ArticleCommentAreaComponent]
})
export class QuoteBookPage {

}