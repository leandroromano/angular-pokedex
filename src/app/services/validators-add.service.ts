import { Injectable } from '@angular/core';
import { PokemonsService } from './pokemons.service';
import { FormControl, AbstractControl, FormGroup, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsAddService {

  constructor(private pokemonsService: PokemonsService) { }

  validatePokemon(name: string) {
    return (formGroup: FormGroup) => {
      const nameControl = formGroup.controls[name];
      const pokemonName = nameControl.value;
      if (this.pokemonsService.existsPokemon(pokemonName)) {
        nameControl.setErrors({ existsPokemon: true })
      }
    }
  }

  validateAddedType(type: string, selectedTypes: string) {
    return (formGroup: FormGroup) => {
      const typeControl = formGroup.controls[type];
      const selectedTypesControl = formGroup.controls[selectedTypes] as FormArray;
      if (selectedTypesControl.value.length === 0) {
        typeControl.setErrors({ notAddedType: true });
      }
    }
  }

}
