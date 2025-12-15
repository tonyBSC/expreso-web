import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectionStrategy, Component, Inject, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';



@Component({
  selector: 'app-snackbar',
  imports: [CommonModule, MatIconModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent {

  snackBarRef = inject(MatSnackBarRef);
  data = inject<SnackbarData>(MAT_SNACK_BAR_DATA)

  close(){
    this.snackBarRef.dismissWithAction()
  }

}
