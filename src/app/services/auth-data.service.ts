import { inject, Injectable, signal } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { APIService } from "./api.service";

@Injectable({
    providedIn: 'root'
})
export class AuthDataService {
    private auth = inject(AuthService);
    private api = inject(APIService);

    isAuthenticated = signal(false);
    name = signal<string | null>(null);
    roles = signal<string[]>([]);

    constructor() {
        this.auth.isAuthenticated$
        .pipe(takeUntilDestroyed())
        .subscribe(v => {
            this.isAuthenticated.set(v);
        })
        
        this.auth.user$.subscribe(u => {
            if (u == null) {
                this.name.set(null);
                this.roles.set([]);
            }
            else {
                this.name.set(u.preferred_username ?? u.nickname ?? u.name ?? 'Logged In');
                this.api.getRoles().subscribe(v => {
                    if (v !== false) {
                        this.roles.set(v);
                    }
                })
            }
        })
    }
}