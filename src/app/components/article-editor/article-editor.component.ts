import { Component, input, output } from "@angular/core";
import { articleCompletionStatuses, articleTags } from "../../services/article.service";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { UIArticle } from "../../services/api.types";

@Component({
    selector: 'app-article-editor',
    templateUrl: './article-editor.component.html',
    styleUrl: './article-editor.component.scss',
    standalone: true,
    imports: [MatInputModule, FormsModule, MatSelectModule, MatButtonModule, MatCheckboxModule]
})
export class ArticleEditorComponent {
    save = output<void>();

    article = input.required<UIArticle>();

    statuses = articleCompletionStatuses;
    tags = articleTags;

    btnSave() {
        console.log('Emitting save')
        this.save.emit();
        // if (this.article().id < 0) {
        //     this.api.postArticle(this.article());
        // }
        // else {
        //     // Edit article endpoint
        // }
    }
}