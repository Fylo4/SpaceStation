import { Component } from "@angular/core";

@Component({
    selector: 'app-metal-panel',
    template: `
    <div class="_MP-rivets">
        <ng-content></ng-content>
    </div>
    `,
    styles: `
    $shimmer-radius: 15%;
    @property --shimmer-center {
        syntax: '<percentage>';
        inherits: false;
        initial-value: 40%;
    }
    @property --shimmer-color {
        syntax: '<color>';
        inherits: false;
        initial-value: rgb(169, 169, 169);
    }
    @property --base-color {
        syntax: '<color>';
        inherits: false;
        initial-value: rgb(69, 69, 69);
    }
    :host {
        border: 2px solid rgb(40, 40, 40);
        padding: 8px;
        background: linear-gradient(135deg,
            var(--base-color) 0%,
            var(--base-color) calc(var(--shimmer-center) - $shimmer-radius),
            var(--shimmer-color) calc(var(--shimmer-center)),
            var(--base-color) calc(var(--shimmer-center) + $shimmer-radius),
            var(--base-color) 100%);
        
        transition: --shimmer-center 700ms cubic-bezier(0.5, 0, 0.5, 1),
            --base-color 700ms, --shimmer-color 700ms;

        --shimmer-center: 40%;
        --base-color: rgb(69, 69, 69);
        --shimmer-color: rgb(169, 169, 169);

        &.interactive {
            &:hover {
                cursor: pointer;
            }
            &:hover,
            &:focus {
                --shimmer-center: 60%;
                --base-color: rgb(80, 80, 80);
                --shimmer-color: rgb(195, 195, 195);
            }
        }

        ._MP-rivets {
            border-style: dotted;
            border-color: rgb(35, 35, 35);
            border-width: 8px;
            border-radius: inherit;
            height: 100%;
            width: 100%;
            overflow: hidden;
        }
    }
    `,
    standalone: true,
    imports: []
})
export class MetalPanelComponent {
}