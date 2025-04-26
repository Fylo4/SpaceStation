import { Component } from "@angular/core";
import { RoutePaths } from "../../app.routes";

@Component({
    selector: 'app-comms-page',
    templateUrl: 'comms.page.html',
    styleUrl: 'comms.page.scss',
    standalone: true,
    imports: []
})
export class CommsPage {
    routes = RoutePaths;
}