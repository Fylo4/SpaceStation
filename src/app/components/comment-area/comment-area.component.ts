import { Component, inject, input, OnInit, signal } from "@angular/core";
import { DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { APIService } from "../../services/api.service";
import { DBComment } from "../../services/api.types";

@Component({
    selector: 'app-comment-area',
    templateUrl: './comment-area.component.html',
    styleUrl: './comment-area.component.scss',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, DatePipe]
})
export class CommentAreaComponent implements OnInit {
    private api = inject(APIService);

    region = input<string>();

    username = signal('');
    website = signal('');
    message = signal('');
    allMessages = signal<DBComment[]>([]);
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
        this.api.getComments(this.region())
        .subscribe(v => {
            if (v !== false) {
                this.messageStatus.set('success');
                this.allMessages.set(v);
            }
            else {
                this.messageStatus.set('error');
            }
        });
    }

    private postMessage() {
        const baseUrl = window.location.origin;
        this.disableButton.set(true);
        this.api.postComment(this.username(), this.website(), this.message(), this.region())
        .subscribe(v => {
            if (v !== false) {
                console.log('Message added'); // TODO Snackbar
                this.disableButton.set(false);
                this.message.set(''); // Don't clear username / website
                this.getMessages();
            }
        });
    }
}