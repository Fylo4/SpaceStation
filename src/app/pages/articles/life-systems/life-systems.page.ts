import { Component } from "@angular/core";
import { RoutePaths } from "../../../app.routes";

@Component({
    selector: 'app-life-systems-page',
    templateUrl: './life-systems.page.html',
    styleUrl: './life-systems.page.scss',
    standalone: true,
    imports: []
})
export class LifeSystemsPage {
    routes = RoutePaths;
}