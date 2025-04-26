import { Component } from "@angular/core";
import { FakeLinkComponent } from "../../../components/fake-link.component";
import { RoutePaths } from "../../../app.routes";

@Component({
    selector: 'app-christ-prayer-page',
    templateUrl: 'christ-prayer.page.html',
    styleUrl: 'christ-prayer.page.scss',
    standalone: true,
    imports: [FakeLinkComponent]
})
export class ChristPrayerPage {
    routes = RoutePaths;
}