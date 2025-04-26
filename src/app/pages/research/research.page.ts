import { Component, inject } from "@angular/core";
import { RoutePaths } from "../../app.routes";
import { BreadcrumbService } from "../../services/breadcrumb.service";
import { FakeLinkComponent } from "../../components/fake-link.component";

@Component({
    selector: 'app-research-page',
    templateUrl: 'research.page.html',
    styleUrl: 'research.page.scss',
    standalone: true,
    imports: [FakeLinkComponent]
})
export class ResearchPage {
    routes = RoutePaths;
    bread = inject(BreadcrumbService);
}