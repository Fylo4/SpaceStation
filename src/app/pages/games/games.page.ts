import { Component } from "@angular/core";
import { RoutePaths } from "../../app.routes";

@Component({
    selector: 'app-games-page',
    templateUrl: 'games.page.html',
    styleUrl: 'games.page.scss',
    standalone: true,
    imports: []
})
export class GamesPage {
    routes = RoutePaths;
}