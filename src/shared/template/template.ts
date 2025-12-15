import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
@Component({
  selector: 'app-template',
  imports: [ TranslateModule, MatIconModule ],
  templateUrl: './template.html',
  styleUrl: './template.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateComponent {
  location = inject(Location);

  title = input.required<String>()
  btn_back = input<boolean>(false)
  show_widget_btn = input<boolean>(false)
  show_create = input.required<boolean>()
  action_create = input.required<() => void>()
  action = output<string>()

  goBack() {
    this.location.back();
  }
}
