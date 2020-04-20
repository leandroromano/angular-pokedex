import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-level-input',
  templateUrl: './level-input.component.html',
  styleUrls: ['./level-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LevelInputComponent),
      multi: true
    }
  ]
})
export class LevelInputComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder?: string;
  @Input() isInvalid?: boolean;

  value: string
  onChange: any = () => { };
  onTouched: any = () => { };
  disabled: boolean;

  constructor() { }
  writeValue(_value: string): void {
    this.value = _value ? _value : ''
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
