import { ChangeDetectionStrategy, Component, input, output, NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'input-form',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
})
export class InputFormComponent {

 text: String = ""
 placeHolder = input.required<String>()
 prefixIcon = input.required<String>()
 margin = input<String>()
 type = input<String>("text")
 disabled = input<boolean>(false)
 inputColor = input<String>("white")
 iconColor = input<String>("white")
 inputFocusColor = input<String>("#ee54d7")

 value = output<String>()

 onInputChange(event: Event) {
  const input = event.target as HTMLInputElement;
  this.value.emit(input.value);
}
//  suffixIcon = input
}
