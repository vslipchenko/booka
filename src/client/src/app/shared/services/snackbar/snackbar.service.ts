import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  public constructor(private readonly snackbar: MatSnackBar) {}

  public open(): void {
    // TODO
  }
}
