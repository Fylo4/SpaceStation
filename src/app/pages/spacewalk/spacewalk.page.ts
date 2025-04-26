import { Component } from "@angular/core";
import { RoutePaths } from "../../app.routes";

@Component({
    selector: 'app-spacewalk-page',
    templateUrl: 'spacewalk.page.html',
    styleUrl: 'spacewalk.page.scss',
    standalone: true,
    imports: []
})
export class SpacewalkPage {
    routes = RoutePaths;
}