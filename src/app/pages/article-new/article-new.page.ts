import { Component, inject } from "@angular/core";
import { UIArticle } from "../../services/api.types";
import { ArticleEditorComponent } from "../../components/article-editor/article-editor.component";
import { APIService } from "../../services/api.service";

@Component({
    selector: 'app-article-new-page',
    templateUrl: './article-new.page.html',
    styleUrl: './article-new.page.scss',
    standalone: true,
    imports: [ArticleEditorComponent]
})
export class ArticleNewPage {
    private api = inject(APIService);

    article: UIArticle = {
        id: -1,
        slug: '',
        title: '',
        articlecontent: '',
        tags: [],
        created: new Date(),
        edited: new Date(),
        epistemicstatus: '',
        completionstatus: '',
        hidden: false,
    }

    SaveArticle = () => {
        console.log('Saving article...')
        this.api.postArticle(this.article).subscribe(v => {
            if (v !== false) {
                // TODO Route to new article
                console.log('Article created')
            }
        })
    }
}