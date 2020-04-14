import { Component, OnInit } from '@angular/core';
import { PokemonsService, Pokemon } from '../../../../services/pokemons.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorsAddService } from '../../../../services/validators-add.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  queryParamName: string;
  pokemon: Pokemon;
  form: FormGroup;

  constructor(private pokemonsService: PokemonsService, private fb: FormBuilder, private route: ActivatedRoute, private pokemonValidators: ValidatorsAddService, private router: Router) {
    this.route.params.subscribe(params => {
      this.queryParamName = params['name'];
    })
    this.pokemon = pokemonsService.getPokemon(this.queryParamName);
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.form = this.fb.group({
      newName: [''],
      newLevel: [''],
      oldName: [this.pokemon.name],
      oldLevel: [this.pokemon.level]
    }, {
      validators: [this.pokemonValidators.validateNotEmptyBothFields('newName', 'newLevel'), this.pokemonValidators.validatePokemon('newName')]
    })
  }

  handleBackClick() {
    this.router.navigate(['modify']);
  }

  saveChanges() {
    console.log(this.form);
    console.log(this.form.controls);
    if (this.form.invalid) {
      console.log("invalidos")
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }
    else {
      this.pokemonsService.updatePokemonInfo(this.queryParamName, this.newName, this.newLevel)
      this.router.navigate(['modify']);
    }
  }

  get invalidName() {
    return this.form.get('newName').errors?.existsPokemon
  }

  get validName() {
    return this.form.get('newName').valid && this.form.get('newName').dirty && this.form.get('newName').value !== '';
  }

  get invalidNullFields() {
    return this.form.errors?.emptyBothFields && this.touchedControls;
  }

  get touchedControls() {
    return Object.values(this.form.controls).every(control => control.touched)
  }

  get newName() {
    return this.form.get('newName').value;
  }

  get newLevel() {
    return this.form.get('newLevel').value;
  }

}
