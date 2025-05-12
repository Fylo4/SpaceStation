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
    delete = output<void>();

    article = input.required<UIArticle>();

    statuses = articleCompletionStatuses;
    tags = articleTags;

    btnSave() {
        this.save.emit();
    }
    btnDelete() {
        this.delete.emit();
    }
}