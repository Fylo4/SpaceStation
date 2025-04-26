import { Component, inject } from "@angular/core";
import { RoutePaths } from "../../app.routes";
import { BreadcrumbService } from "../../services/breadcrumb.service";
import { MetalPanelComponent } from "../../components/metal-panel.component";

@Component({
    selector: 'app-home-page',
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss',
    standalone: true,
    imports: [MetalPanelComponent]
})
export class HomePageComponent {
    bread = inject(BreadcrumbService);
    routes = RoutePaths;
}