import { Component } from "@angular/core";
import { RoutePaths } from "../../app.routes";

@Component({
    selector: 'app-media-page',
    templateUrl: 'collections.page.html',
    styleUrl: 'collections.page.scss',
    standalone: true,
    imports: []
})
export class CollectionsPage {
    routes = RoutePaths;
}