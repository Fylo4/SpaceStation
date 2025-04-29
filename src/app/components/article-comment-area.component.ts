import { Component, input } from "@angular/core";
import { CommentAreaComponent } from "./comment-area/comment-area.component";

// Just a wrapper around my comment area component
// Used in all my articles

@Component({
    selector: 'app-article-comment-area',
    template: `
    <hr />
    <h2>Comments</h2>
    <app-comment-area [region]="region()" />
    `,
    styles: ``,
    standalone: true,
    imports: [CommentAreaComponent]
})
export class ArticleCommentAreaComponent {
    region = input<string>();
}