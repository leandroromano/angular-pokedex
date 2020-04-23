import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonsService, Pokemon } from '../../../../services/pokemons.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorsAddService } from '../../../../services/pokemon-validators.service';
import { ModalService } from '../../../../services/modal.service';
import { ConfirmationResponse } from '../../../portals/confirmation/confirmation.component';
import { Subscription } from 'rxjs';
import { isUndefined } from 'util';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit, OnDestroy {

  queryParamName: string;
  pokemon: Pokemon;
  form: FormGroup;
  loading: boolean = false;
  modalResponse: boolean;
  subscription: Subscription

  constructor(private pokemonsService: PokemonsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private pokemonValidators: ValidatorsAddService,
    private router: Router,
    private modal: ModalService) {

    this.route.params.subscribe(params => {
      this.queryParamName = params['name'];
    })
    this.pokemon = pokemonsService.getPokemon(this.queryParamName);
    this.createForm();
    this.createListeners();
    this.form.get('oldName').disable();
    this.form.get('oldLevel').disable()
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (!isUndefined(this.subscription)) {
      this.subscription.unsubscribe()
    }
    this.modal.closeSubjectSubscription();
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

  createListeners() {
    this.form.get('newName').valueChanges.subscribe(value => {
      if (value !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false
        }, 3000);
      }
    })
  }

  handleBackClick() {
    this.router.navigate(['modify']);
  }

  saveChanges() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }
    else {
      this.modal.showModal(this.queryParamName + "'s info will be updated")
      this.modal.getModalConfirmation().subscribe((confirmation: ConfirmationResponse) => {
        this.modalResponse = confirmation ? confirmation.isConfirmed : false
        if (this.modalResponse) {
          this.pokemonsService.updatePokemonInfo(this.queryParamName, this.newName, this.newLevel)
          this.router.navigate(['modify']);
        }
      })
    }
  }

  get invalidName() {
    return this.form.get('newName').errors?.existsPokemon && !this.loading
  }

  get validName() {
    return this.form.get('newName').valid && this.form.get('newName').dirty && this.form.get('newName').value !== '' && !this.loading;
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
