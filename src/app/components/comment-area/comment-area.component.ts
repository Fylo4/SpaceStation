import { HttpClient } from "@angular/common/http";
import { Component, inject, input, OnInit, signal } from "@angular/core";
import { DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { catchError, map, Observable, of } from "rxjs";

@Component({
    selector: 'app-comment-area',
    templateUrl: './comment-area.component.html',
    styleUrl: './comment-area.component.scss',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, DatePipe]
})
export class CommentAreaComponent implements OnInit {
    private http = inject(HttpClient);

    region = input<string>();

    username = signal('');
    website = signal('');
    message = signal('');
    allMessages = signal<DBMessage[]>([]);
    messageStatus = signal<'loading' | 'error' | 'success' | 'initial'>('initial');
    disableButton = signal(false);

    ngOnInit() {
        this.getMessages();
    }

    btnAddMessage() {
        if (this.vaidatePostMessage()) {
            this.postMessage();
        }
    }

    private vaidatePostMessage() {
        if (this.username().length > 100) {
            console.warn('Username cannot be over 100 characters');
            return false;
        }
        if (!this.username().trim().length) {
            console.warn('Username is required');
            return false;
        }
        if (this.website().length > 100) {
            console.warn('Website cannot be over 100 characters');
            return false;
        }
        if (this.message().length > 1000) {
            console.warn('Message cannot be over 1000 characters');
            return false;
        }
        if (!this.message().trim().length) {
            console.warn('Message is required');
            return false;
        }

        return true;
    }

    private getMessages() {
        this.messageStatus.set('loading');
        const baseUrl = window.location.origin;
        this.http.get<{Messages: DBMessage[]}>(`${baseUrl}/.netlify/functions/getMessages?Category=${this.region()}`)
        .pipe(map(v => {
            return v.Messages.map(m => ({
                ...m,
                createdtime: new Date(m.createdtime ?? '')
            }) as DBMessage)
        }))
        .pipe(catchError(e => {
            console.error(e); // TODO Snackbar
            this.messageStatus.set('error');
            return of(false) as Observable<false>;
        }))
        .subscribe(v => {
            if (v !== false) {
                this.messageStatus.set('success');
                this.allMessages.set(v);
            }
        });
    }

    private postMessage() {
        const baseUrl = window.location.origin;
        this.disableButton.set(true);
        this.http.post(`${baseUrl}/.netlify/functions/postMessage`, {
            Username: this.username(),
            Website: this.website(),
            Message: this.message(),
            Category: this.region()
        })
        .pipe(catchError(e => {
            console.error(e); // TODO Snackbar
            this.disableButton.set(false);
            return of(false);
        }))
        .subscribe(v => {
            console.log('Message added'); // TODO Snackbar
            this.disableButton.set(false);
            this.message.set(''); // Don't clear username / website
            this.getMessages();
        });
    }
}

type DBMessage = {
    username?: string,
    website?: string,
    category?: string,
    message?: string
    createdtime?: Date;
}