import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { DBArticle, DBComment, UIArticle } from "./api.types";

@Injectable({
    providedIn: 'root'
})
export class APIService {
    private http = inject(HttpClient);

    private baseUrl: string;

    constructor() {
        this.baseUrl = window.location.origin;
    }

    postComment(Username: string, Website: string | null, Message: string, Category?: string | undefined) {
        return this.http.post(
            `${this.baseUrl}/.netlify/functions/postMessage`,
            { Username, Website, Message, Category}
        ).pipe(catchError(e => {
            console.error(e); // TODO Snackbar
            return of(false) as Observable<false>;
        }))
    }

    getComments(region?: string, nonComms: boolean = false) {
        const params = region?.length ? `?Category=${region}` : '';
        const functionName = nonComms ? 'getNonCommsMessages' : 'getMessages';

        return this.http.get<{Messages: DBComment[]}>(`${this.baseUrl}/.netlify/functions/${functionName}${params}`)
        .pipe(map(v => {
            return v.Messages.map(m => ({
                ...m,
                createdtime: new Date(m.createdtime ?? '')
            }) as DBComment)
        }))
        .pipe(catchError(e => {
            console.error(e); // TODO Snackbar
            return of(false) as Observable<false>;
        }))
    }

    getArticleBySlug(slug: string): Observable<false | UIArticle> {
        return this.http.get<DBArticle>(`${this.baseUrl}/.netlify/functions/getArticleBySlug?Slug=${slug}`)
        .pipe(map(ArticleDB_to_UI))
        .pipe(catchError(e => {
            console.error(e); // TODO Snackbar
            return of(false) as Observable<false>;
        }))
    }

    getArticleList(): Observable<false | UIArticle[]> {
        return this.http.get<{Articles: DBArticle[]}>(`${this.baseUrl}/.netlify/functions/getArticleList`)
        .pipe(map(v => v.Articles.map(ArticleDB_to_UI)))
        .pipe(catchError(e => {
            console.error(e); // TODO Snackbar
            return of(false) as Observable<false>;
        }))
    }

    postArticle(article: UIArticle) {
        const dbArticle = ArticleUI_to_DB(article);
        return this.http.post(`${this.baseUrl}/.netlify/functions/postArticle`, dbArticle)
        .pipe(catchError(e => {
            console.error(e); // TODO Snackbar
            return of(false) as Observable<false>;
        }));
    }

    updateArticle(article: UIArticle) {
        const dbArticle = ArticleUI_to_DB(article);
        return this.http.put(`${this.baseUrl}/.netlify/functions/updateArticle`, dbArticle)
        .pipe(catchError(e => {
            console.error(e); // TODO Snackbar
            return of(false) as Observable<false>;
        }));
    }

    deleteArticle(id: number) {
        return this.http.delete(`${this.baseUrl}/.netlify/functions/deleteArticle?id=${id}`)
        .pipe(catchError(e => {
            console.error(e); // TODO Snackbar
            return of(false) as Observable<false>;
        }));
    }

    getRoles(): Observable<string[] | false> {
        return this.http.get<string[]>(`${this.baseUrl}/.netlify/functions/getRoles`)
        .pipe(catchError(e => {
            console.error(e); // TODO Snackbar
            return of(false) as Observable<false>;
        }));
    }
}

const ArticleDB_to_UI = (input: DBArticle): UIArticle => {
    return {
        ...input,
        created: input.created == null ? undefined : new Date(input.created),
        edited: input.edited == null ? undefined : new Date(input.edited),
        hidden: getBool(input.hidden),
        tags: (input.tags?.split(',') ?? []).filter(t => t.length)
    }
}

const ArticleUI_to_DB = (input: UIArticle): DBArticle => {
    // const dp = (new DatePipe('en-US')).transform;
    return {
        ...input,
        // created: dp(input.created, 'short') ?? undefined,
        // edited: dp(input.edited, 'short') ?? undefined,
        created: input.created?.toString(),
        edited: input.edited?.toString(),
        hidden: getBool(input.hidden),
        tags: input.tags?.join(',') ?? ''
    }
}

const getBool = (input: unknown): boolean => {
    if (input == null) return false;
    if (typeof input == 'boolean') return input;
    if (typeof input == 'number') return !!input;
    if (typeof input == 'string') return input.toLowerCase() == 'true' || input =='1';
  
    return true;
}