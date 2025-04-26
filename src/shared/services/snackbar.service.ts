import { Component, Inject, Injectable, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbar = inject(MatSnackBar);
  private errorSvc = inject(ErrorService);

  private duration = 3000;
  private openSnackbar?: MatSnackBarRef<unknown>;

  error(error: unknown) {
    let msg = this.errorSvc.getErrorMessage(error);
    console.error(msg);
    if (msg.length > 303) msg = msg.substring(0, 300) + '...';
    const config = { duration: this.duration, data: { message: msg, color: 'red' } };
    this.showSnackbar(config);
  }
  success(message: string) {
    const config = { duration: this.duration, data: { message, color: 'green' } };
    this.showSnackbar(config);
  }
  warn(message: string) {
    const config = { duration: this.duration, data: { message, color: 'yellow' } };
    this.showSnackbar(config);
  }
  clear() {
    if (this.openSnackbar) this.openSnackbar.dismiss();
  }

  private showSnackbar(config: MatSnackBarConfig<unknown>) {
    this.clear();
    this.openSnackbar = this.snackbar.openFromComponent(CustomSnackbarComponent, config);
    this.openSnackbar.afterDismissed().subscribe(() => (this.openSnackbar = undefined));
  }
}

@Component({
  template: `
    <span matSnackBarLabel>
      <div class="flex-row gap-h h-100">
        <div [style.backgroundColor]="data.color" class="color"></div>
        <span>{{ data.message }}</span>
      </div>
    </span>
    <!-- <span matSnackBarActions>
      <button mat-button matSnackBarAction (click)="snackBarRef.dismissWithAction()"></button>
    </span> -->
  `,
  styles: `
    :host {
      display: flex;
    }
    .color {
      height: 100%;
      width: 10px;
      border-radius: 2px;
    }
  `,
  standalone: true,
  imports: [MatButtonModule, MatSnackBarLabel],
})
class CustomSnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { color: string; message: string }) {}
}
