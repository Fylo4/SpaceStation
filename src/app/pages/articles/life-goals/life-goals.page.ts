import { Component } from "@angular/core";
import { RoutePaths } from "../../../app.routes";

@Component({
    selector: 'app-life-goals-page',
    templateUrl: 'life-goals.page.html',
    styleUrl: 'life-goals.page.scss',
    standalone: true,
    imports: []
})
export class LifeGoalsPage {
    routes = RoutePaths;
}