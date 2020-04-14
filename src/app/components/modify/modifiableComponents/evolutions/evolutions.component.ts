import { Component, OnInit } from '@angular/core';
import { PokemonsService, Evolution } from '../../../../services/pokemons.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorsAddService } from '../../../../services/pokemon-validators.service';

@Component({
  selector: 'app-evolutions',
  templateUrl: './evolutions.component.html',
  styleUrls: ['./evolutions.component.css']
})
export class EvolutionsComponent implements OnInit {

  form: FormGroup;
  pokemonsTypes: string[] = [];
  queryParamName: string;

  constructor(private pokemonsService: PokemonsService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private pokemonValidator: ValidatorsAddService) {

    this.route.params.subscribe(params => {
      this.queryParamName = params['name'];
    })
    this.pokemonsTypes = this.pokemonsService.getTypes();
    this.createForm();
  }

  ngOnInit(): void {
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
      let evolution: Evolution = {
        name: this.evolutionName,
        levelRequired: this.evolutionLevel,
        types: this.selectedTypes.value
      }
      this.pokemonsService.updatePokemonEvolutions(this.queryParamName, evolution)
      this.router.navigate(['modify']);
    }
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
    return this.form.get('evolutionName').invalid && this.form.get('evolutionName').touched;
  }

  get validName() {
    return this.form.get('evolutionName').valid && this.form.get('evolutionName').touched;
  }

  get invalidRepeteadName() {
    return this.form.get('evolutionName').errors?.existsEvolution && this.form.get('evolutionName').touched;
  }

  get requiredName() {
    return this.form.get('evolutionName').errors?.required && this.form.get('evolutionName').touched;
  }

  get invalidLevel() {
    return this.form.get('evolutionLevel').invalid && this.form.get('evolutionLevel').touched;
  }

}
