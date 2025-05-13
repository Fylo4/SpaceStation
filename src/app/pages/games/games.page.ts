import { Component } from "@angular/core";
import { RoutePaths } from "../../app.routes";
import { MatExpansionModule } from '@angular/material/expansion'
import { MatTabsModule } from '@angular/material/tabs'

@Component({
    selector: 'app-games-page',
    templateUrl: 'games.page.html',
    styleUrl: 'games.page.scss',
    standalone: true,
    imports: [MatExpansionModule, MatTabsModule]
})
export class GamesPage {
    routes = RoutePaths;
}