import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonsService, Evolution, PokemonType } from '../../../../services/pokemons.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorsAddService } from '../../../../services/pokemon-validators.service';
import { NameInputComponent } from '../../../custom-controls/name-input/name-input.component';
import { TypesSelectComponent } from '../../../custom-controls/types-select/types-select.component';
import { LevelInputComponent } from '../../../custom-controls/level-input/level-input.component'
import { Subscription } from 'rxjs';
import { ModalService } from '../../../../services/modal.service';
import { ConfirmationResponse } from '../../../portals/confirmation/confirmation.component';
import { isUndefined } from 'util';

@Component({
  selector: 'app-evolutions',
  templateUrl: './evolutions.component.html',
  styleUrls: ['./evolutions.component.css']
})
export class EvolutionsComponent implements OnInit, OnDestroy {

  form: FormGroup;
  pokemonsTypes: PokemonType[] = [];
  queryParamName: string;
  loading: boolean = false;
  modalResponse: boolean;
  subscription: Subscription;

  constructor(private pokemonsService: PokemonsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pokemonValidator: ValidatorsAddService,
    private modal: ModalService) {

    this.route.params.subscribe(params => {
      this.queryParamName = params['name'];
    })
    this.pokemonsTypes = this.pokemonsService.getTypes();
    this.createForm();
    this.createListener();
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
      evolutionName: ['', Validators.required],
      evolutionLevel: ['', Validators.required],
      currentType: ['', Validators.required],
      selectedTypes: this.fb.array([])
    }, {
      validators: [this.pokemonValidator.validateAddedType('currentType', 'selectedTypes'), this.pokemonValidator.validateEvolution(this.queryParamName, 'evolutionName')]
    })
  }

  addType(event) {
    let selectedType = event;
    if (!this.selectedTypes.value.includes(selectedType) && selectedType !== '') {
      this.selectedTypes.push(this.fb.control(selectedType));
      this.pokemonsTypes = this.pokemonsTypes.filter(type => type.name !== selectedType);
    }
  }

  changeType(e) {
    this.currentType.setValue(e.target.value, {
      onlySelf: true
    })
  }

  deleteType(deletedType: number) {
    let type = this.selectedTypes.controls[deletedType].value;
    this.pokemonsTypes.push(this.getCurrentTypeObject(type));
    this.selectedTypes.removeAt(deletedType);
  }

  getCurrentTypeObject(typeName: string) {
    return this.pokemonsService.getType(typeName);
  }

  save() {
    console.log(this.form);
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched()
      })
    }
    else {
      let title = this.evolutionName + " will be added to " + this.queryParamName
      this.modal.showModal(title)
      this.subscription = this.modal.getModalConfirmation().subscribe((confirmation: ConfirmationResponse) => {
        this.modalResponse = confirmation ? confirmation.isConfirmed : false
        if (this.modalResponse) {
          this.pokemonsService.updatePokemonEvolutions(this.queryParamName, this.evolutionName, this.evolutionLevel, this.selectedTypes.value)
          this.router.navigate(['modify']);
        }
      })
    }
  }

  createListener() {
    this.form.get('evolutionName').valueChanges.subscribe(value => {
      if (value !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false
        }, 3000);
      }
    })
  }

  get evolutionName() {
    return this.form.get('evolutionName').value;
  }

  get evolutionLevel() {
    return this.form.get('evolutionLevel').value;
  }

  get selectedTypes() {
    return this.form.get('selectedTypes') as FormArray;
  }

  get currentType() {
    return this.form.get('currentType');
  }

  get requiredType() {
    return this.form.get('currentType').errors?.required && this.form.get('currentType').touched;
  }

  get notAddedType() {
    return this.form.errors?.notAddedType
  }

  get invalidType() {
    return this.form.get('currentType').invalid && this.form.get('currentType').touched && this.selectedTypes.length === 0;
  }

  get invalidName() {
    return this.form.get('evolutionName').invalid && (this.form.get('evolutionName').touched || this.form.get('evolutionName').dirty) && !this.loading;
  }

  get validName() {
    return this.form.get('evolutionName').valid && (this.form.get('evolutionName').touched || this.form.get('evolutionName').dirty) && !this.loading;
  }

  get invalidRepeteadName() {
    return this.form.get('evolutionName').errors?.existsEvolution && (this.form.get('evolutionName').touched || this.form.get('evolutionName').dirty) && !this.loading;
  }

  get requiredName() {
    return this.form.get('evolutionName').errors?.required && (this.form.get('evolutionName').touched || this.form.get('evolutionName').dirty) && !this.loading;
  }

  get invalidLevel() {
    return this.form.get('evolutionLevel').invalid && (this.form.get('evolutionLevel').touched || this.form.get('evolutionLevel').dirty);
  }

}
