import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService {
    private router = inject(Router);

    get paths() {
        return this._paths;
    }

    private _paths: string[] = [];

    navigateAndAdd(path: string) {
        const currentUrl = this.router.url.slice(1); // Path without initial '/'
        // If the new path is in _paths, erase up to and including it
        const existingIndex = this._paths.findIndex(p => p === currentUrl);
        if (existingIndex >= 0) {
            this._paths = this._paths.slice(0, existingIndex);
        }
        // Add the current url to _paths
        this._paths.push(currentUrl);
        // Add the new path and navigate
        this._paths.push(path);
        this.router.navigateByUrl(path);
    }
    revertToPathIndex(index: number) {
        const newUrl = this._paths[index];
        this._paths = this._paths.slice(0, index+1);
        this.router.navigateByUrl(newUrl);
    }
    clear() {
        this._paths = [];
    }
    
}