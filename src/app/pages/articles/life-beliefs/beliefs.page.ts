import { Component } from "@angular/core";
import { RoutePaths } from "../../../app.routes";

@Component({
    selector: 'app-beliefs-page',
    templateUrl: 'beliefs.page.html',
    styleUrl: 'beliefs.page.scss',
    standalone: true,
    imports: []
})
export class BeliefsPage {
    routes = RoutePaths;
}