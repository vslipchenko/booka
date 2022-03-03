import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarRef} from '@angular/material/snack-bar/snack-bar-ref';
import {TextOnlySnackBar} from '@angular/material/snack-bar/simple-snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  public constructor(private readonly snackbar: MatSnackBar) {}

  public open(message: string, action: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackbar.open(message, action, {panelClass: 'snackbar-theme-light'});
  }
}
