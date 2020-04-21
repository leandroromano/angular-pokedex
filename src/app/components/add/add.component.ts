import { Component, OnInit } from '@angular/core';
import { PokemonsService, Pokemon, PokemonType } from '../../services/pokemons.service';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ValidatorsAddService } from '../../services/pokemon-validators.service';
import { Router } from '@angular/router';
import { Overlay, GlobalPositionStrategy } from '@angular/cdk/overlay';
import { ModalService } from '../../services/modal.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  form: FormGroup
  loading: boolean = false;

  constructor(private pokemonsService: PokemonsService,
    private fb: FormBuilder,
    private validators: ValidatorsAddService,
    private router: Router,
    private modal: ModalService) {
    this.createForm();
    this.createListener();
  }

  pokemon: Pokemon;
  pokemonsTypes: PokemonType[] = [];

  ngOnInit(): void {
    this.pokemonsTypes = this.pokemonsService.getTypes();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
      currentType: ['', Validators.required],
      selectedTypes: this.fb.array([]),
    }, {
      validators: [this.validators.validatePokemon('name')
        , this.validators.validateAddedType('currentType', 'selectedTypes')
      ]
    });
  }

  createListener() {
    this.form.get('name').valueChanges.subscribe(value => {
      if (value !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false
        }, 3000);
      }
    })
  }

  get types() {
    return this.form.get('types') as FormArray;
  }

  get currentType() {
    return this.form.get('currentType');
  }

  get invalidName() {
    return this.form.get('name').invalid && (this.form.get('name').touched || this.form.get('name').dirty) && !this.loading;
  }

  get invalidLevel() {
    return this.form.get('level').invalid && (this.form.get('level').touched || this.form.get('level').dirty);
  }

  get invalidType() {
    return this.form.get('currentType').invalid && this.form.get('currentType').touched && this.selectedTypes.length === 0;
  }

  get validName() {
    return this.form.get('name').valid && (this.form.get('name').touched || this.form.get('name').dirty) && !this.loading;
  }

  get requiredName() {
    return this.form.get('name').errors?.required && (this.form.get('name').touched || this.form.get('name').dirty) && !this.loading;
  }

  get invalidRepeteadName() {
    return this.form.get('name').errors?.existsPokemon && (this.form.get('name').touched || this.form.get('name').dirty) && !this.loading;
  }

  get requiredType() {
    return this.form.get('currentType').errors?.required && this.form.get('currentType').touched;
  }

  get notAddedType() {
    return this.form.errors?.notAddedType
  }

  get selectedTypes() {
    return this.form.get('selectedTypes') as FormArray;
  }

  addType(event) {
    let selectedType = event;
    if (!this.selectedTypes.value.includes(selectedType) && selectedType !== '') {
      this.selectedTypes.push(this.fb.control(selectedType));
      this.pokemonsTypes = this.pokemonsTypes.filter(type => type.name !== selectedType);
    }
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
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched()
      })
    }
    else {
      this.modal.showModal();
      debugger;
      if (this.modal.getConfirmationResponse()) {
        let _name = this.form.get('name').value;
        let _level = this.form.get('level').value;
        let _types = this.form.get('selectedTypes').value;
        this.pokemonsService.addPokemon(_name, _level, _types);
        this.router.navigate(['']);
      }
    }
  }
}
