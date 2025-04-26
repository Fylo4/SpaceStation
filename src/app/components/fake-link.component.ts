import { Component, inject, input } from "@angular/core";
import { BreadcrumbService } from "../services/breadcrumb.service";

@Component({
    selector: 'flink',
    template: `
    <span class='link' (click)="bread.navigateAndAdd(href())">
        <ng-content></ng-content>
    </span>
    `,
    styles: '',
    standalone: true,
    imports: []
})
export class FakeLinkComponent {
    bread = inject(BreadcrumbService);
    href = input.required<string>();
}