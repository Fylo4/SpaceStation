import { Component, inject, input } from "@angular/core";
import { Article, articleCompletionStatuses, ArticleService, articleTags } from "../../services/article.service";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'app-article-editor',
    templateUrl: './article-editor.component.html',
    styleUrl: './article-editor.component.scss',
    standalone: true,
    imports: [MatInputModule, FormsModule, MatSelectModule, MatButtonModule]
})
export class ArticleEditorComponent {
    articleSvc = inject(ArticleService);

    article = input.required<Article>();

    statuses = articleCompletionStatuses;
    tags = articleTags;

    btnSave() {
        const date = new DatePipe('en-US').transform(new Date(), 'shortDate') ?? "";
        this.article().edited = date;
        this.articleSvc.downloadAllArticles();
    }
}