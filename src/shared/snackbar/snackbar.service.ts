import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar.component'



@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
constructor(private snackBar: MatSnackBar) {}

  showSnackbar( data: SnackbarData) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 4000,
      data: data,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar'],
    });
  }
}