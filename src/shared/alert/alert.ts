import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

export interface Alert {
  title: string;
  message: string;
  type: string
  actions: any[]
}

@Component({
  selector: 'app-alert',
  imports: [ CommonModule ],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent {

  data = inject<Alert>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<AlertComponent>)

  action(value: any){
    this.dialogRef.close(value)
  }

}
