import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonsService, Ability } from '../../../../services/pokemons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { Subscription } from 'rxjs';
import { ConfirmationResponse } from '../../../portals/confirmation/confirmation.component';
import { isUndefined } from 'util';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.css']
})
export class AbilitiesComponent implements OnInit, OnDestroy {

  queryParamName: string;
  form: FormGroup;
  modalResponse: boolean;
  subscription: Subscription;

  constructor(private pokemonsService: PokemonsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modal: ModalService) {

    this.route.params.subscribe(params => {
      this.queryParamName = params['name'];
    })
    this.createForm()
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (!isUndefined(this.subscription)) {
      this.subscription.unsubscribe();
    }
    this.modal.closeSubjectSubscription();
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
      let title = this.abilityName + " will be added to " + this.queryParamName
      this.modal.showModal(title)
      this.subscription = this.modal.getModalConfirmation().subscribe((confirmation: ConfirmationResponse) => {
        this.modalResponse = confirmation ? confirmation.isConfirmed : false
        if (this.modalResponse) {
          let newAbility: Ability = {
            name: this.abilityName,
            damage: this.abilityDamage
          }
          this.pokemonsService.updatePokemonAbilities(this.queryParamName, newAbility);
          this.router.navigate(['modify']);
        }
      })
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
