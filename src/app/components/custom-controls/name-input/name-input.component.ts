import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-name-input',
  templateUrl: './name-input.component.html',
  styleUrls: ['./name-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NameInputComponent),
      multi: true
    }
  ]
})

export class NameInputComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder?: string;
  @Input() isInvalid?: boolean;
  @Input() isValid?: boolean;

  value: string
  onChange: any = () => { };
  onTouched: any = () => { };
  disabled: boolean

  constructor() { }
  writeValue(_value: string): void {
    this.value = _value ? _value : '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {
  }

}
