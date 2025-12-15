import { ChangeDetectionStrategy, Component, inject, input, output, Signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule, MatButtonModule, TranslateModule, MatProgressBarModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTemplate {
  data = inject(MAT_DIALOG_DATA);
  translate = inject(TranslateService)
  title = input.required<String>()
  isLoad = input.required<Signal<boolean> | undefined>();
  disable = input<boolean>(false)
  action = output<void>()
  
  constructor(){
    this.translate.addLangs(['es', 'en']);
  }

  
}
