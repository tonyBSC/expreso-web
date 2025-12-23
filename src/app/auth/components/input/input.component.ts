import { ChangeDetectionStrategy, Component, input, output, NgModule, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'input-form',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFormComponent),
      multi: true
    }
  ]
})
export class InputFormComponent implements ControlValueAccessor{

  text: string = ""

  placeHolder = input.required<String>()
  prefixIcon = input.required<String>()
  margin = input<String>()
  type = input<String>("text")
  disabled = input<boolean>(false)
  inputColor = input<String>("white")
  iconColor = input<String>("white")
  inputFocusColor = input<String>("#ee54d7")
  showBtn = input<boolean>(false)
  suffixIcon = input<String>()


  value = output<String>()
  iconClick = output()

  onTouched = () => {};
  onChange = (value: string) => {};

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    // this.value.emit(input.value);
    this.text = input.value
    this.onChange(this.text);
  }

  writeValue(value: string) {
    this.text = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onClick(){
    this.iconClick.emit()
  }
//  suffixIcon = input
}
