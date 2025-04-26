import { Component } from "@angular/core";
import { RoutePaths } from "../../app.routes";

@Component({
    selector: 'app-blueprints-page',
    templateUrl: 'blueprints.page.html',
    styleUrl: 'blueprints.page.scss',
    standalone: true,
    imports: []
})
export class BlueprintsPage {
    routes = RoutePaths;
}