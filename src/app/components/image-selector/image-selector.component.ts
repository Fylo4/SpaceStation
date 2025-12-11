import { Component, inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { APIService } from "../../services/api.service";

@Component({
    selector: 'app-image-selector',
    templateUrl: './image-selector.component.html',
    styleUrl: './image-selector.component.scss',
    standalone: true,
    imports: [MatButton]
})
export class ImageSelectorDialog {
    private dialog = inject(MatDialog);
    private api = inject(APIService);

    selectedImage: number | null = null;

    constructor(public dialogRef: MatDialogRef<ImageSelectorDialog>) {
        this.api.getImageListRecent(10).subscribe(v => console.log(v));
    }

    btnCancel() {
        this.dialogRef.close(null);
    }
    btnSelect() {

    }
}