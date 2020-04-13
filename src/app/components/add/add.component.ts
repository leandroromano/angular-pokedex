import { Component, OnInit } from '@angular/core';
import { PokemonsService, Pokemon } from '../../services/pokemons.service';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ValidatorsAddService } from '../../services/validators-add.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  form: FormGroup

  constructor(private pokemonsService: PokemonsService,
    private fb: FormBuilder,
    private validators: ValidatorsAddService,
    private router: Router) {
    this.createForm();
  }

  pokemon: Pokemon;
  pokemonsTypes: string[] = [];

  ngOnInit(): void {
    this.pokemonsTypes = this.pokemonsService.getTypes();
    console.log(this.pokemonsTypes);
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

  get types() {
    return this.form.get('types') as FormArray;
  }

  get currentType() {
    return this.form.get('currentType');
  }

  get invalidName() {
    return this.form.get('name').invalid && this.form.get('name').touched;
  }

  get invalidLevel() {
    return this.form.get('level').invalid && this.form.get('level').touched;
  }

  get invalidType() {
    return this.form.get('currentType').invalid && this.form.get('currentType').touched && this.selectedTypes.length === 0;
  }

  get validName() {
    return this.form.get('name').valid && this.form.get('name').touched;
  }

  get requiredName() {
    return this.form.get('name').errors?.required && this.form.get('name').touched;
  }

  get invalidRepeteadName() {
    return this.form.get('name').errors?.existsPokemon && this.form.get('name').touched;
  }

  get requiredType() {
    debugger;
    return this.form.get('currentType').errors?.required && this.form.get('currentType').touched;
  }

  get notAddedType() {
    return this.form.get('currentType').errors?.notAddedType && this.form.get('currentType').dirty;
  }

  get selectedTypes() {
    return this.form.get('selectedTypes') as FormArray;
  }

  addType() {
    let selectedType = this.currentType.value;
    if (!this.selectedTypes.value.includes(selectedType) && selectedType !== '') {
      this.selectedTypes.push(this.fb.control(selectedType));
      this.pokemonsTypes = this.pokemonsTypes.filter(type => type !== selectedType);
    }
  }

  changeType(e) {
    this.currentType.setValue(e.target.value, {
      onlySelf: true
    })
  }

  deleteType(deletedType: number) {
    let type = this.selectedTypes.controls[deletedType].value;
    this.pokemonsTypes.push(type);
    this.selectedTypes.removeAt(deletedType);
  }

  save() {
    console.log(this.form);
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched()
      })
    }
    else {
      let _name = this.form.get('name').value;
      let _level = this.form.get('level').value;
      let _types = this.form.get('selectedTypes').value;
      this.pokemon = {
        name: _name,
        level: _level,
        types: _types,
        abilities: [],
        evolutions: []
      }
      this.pokemonsService.addPokemon(this.pokemon);
      this.router.navigate(['']);
    }
  }

}
