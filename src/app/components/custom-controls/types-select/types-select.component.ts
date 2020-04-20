import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { PokemonType } from '../../../services/pokemons.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-types-select',
  templateUrl: './types-select.component.html',
  styleUrls: ['./types-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TypesSelectComponent),
      multi: true
    }
  ]
})
export class TypesSelectComponent implements OnInit, ControlValueAccessor {

  @Input() types: PokemonType[]
  @Input() invalidType: boolean;
  @Input() requiredType: boolean;
  @Input() notAddedType: boolean;

  @Output() currentType: EventEmitter<string>;

  value: string
  onChange: any = () => { };
  onTouched: any = () => { };
  disabled: boolean;

  constructor() {
    this.currentType = new EventEmitter();
  }
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

  emitCurrentType() {
    this.currentType.emit(this.value);
    this.value = "";
  }

}
