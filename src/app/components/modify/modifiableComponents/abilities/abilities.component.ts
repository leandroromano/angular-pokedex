import { Component, OnInit } from '@angular/core';
import { PokemonsService, Ability } from '../../../../services/pokemons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.css']
})
export class AbilitiesComponent implements OnInit {

  queryParamName: string;
  form: FormGroup;

  constructor(private pokemonsService: PokemonsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {

    this.route.params.subscribe(params => {
      this.queryParamName = params['name'];
    })
    this.createForm()
  }

  ngOnInit(): void {
  }

  createForm() {
    this.form = this.fb.group({
      abilityName: ['', Validators.required],
      damage: ['', Validators.required]
    })
  }

  saveChanges() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched()
      })
    } else {
      let newAbility: Ability = {
        name: this.abilityName,
        damage: this.abilityDamage
      }
      this.pokemonsService.updatePokemonAbilities(this.queryParamName, newAbility);
      this.router.navigate(['modify']);
    }
  }

  handleBackClick() {
    this.router.navigate(['modify']);
  }

  get invalidName() {
    return this.form.get('abilityName').errors?.required && this.form.get('abilityName').touched
  }

  get invalidDamage() {
    return this.form.get('damage').errors?.required && this.form.get('damage').touched
  }

  get abilityName() {
    return this.form.get('abilityName').value
  }

  get abilityDamage() {
    return this.form.get('damage').value;
  }

}
