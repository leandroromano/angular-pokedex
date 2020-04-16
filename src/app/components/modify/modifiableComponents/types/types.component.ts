import { Component, OnInit } from '@angular/core';
import { PokemonsService, PokemonType } from '../../../../services/pokemons.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit {

  queryParamName: string;
  pokemonTypesToDelete: PokemonType[] = [];
  pokemonTypesToAdd: PokemonType[] = [];
  addedTypes: PokemonType[] = [];
  removedTypes: PokemonType[] = [];
  notTypesError: boolean = false;

  constructor(private pokemonsService: PokemonsService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.queryParamName = params['name'];
    })
    this.pokemonTypesToDelete = pokemonsService.getTypesToDelete(this.queryParamName);
    this.pokemonTypesToAdd = pokemonsService.getTypesToAdd(this.queryParamName)
  }

  ngOnInit(): void {
  }

  getTypeObject(typeName: string) {
    return this.pokemonsService.getType(typeName);
  }

  handleAddClick(newType: string) {
    if (this.pokemonTypesToDelete.length < 1) this.notTypesError = false;
    this.addedTypes.push(this.getTypeObject(newType));
    this.pokemonTypesToAdd = this.pokemonTypesToAdd.filter(type => type.name !== newType)
    this.pokemonTypesToDelete.push(this.getTypeObject(newType))
  }

  handleRemoveClick(removedType: string) {
    this.removedTypes.push(this.getTypeObject(removedType));
    this.pokemonTypesToAdd.push(this.getTypeObject(removedType));
    this.pokemonTypesToDelete = this.pokemonTypesToDelete.filter(type => type.name !== removedType)
  }

  handleBackClick() {
    this.router.navigate(['modify']);
  }

  saveChanges() {
    if (this.pokemonTypesToDelete.length == 0) {
      this.notTypesError = true;
    }
    else {
      this.pokemonsService.updateTypes(this.queryParamName, this.addedTypes, this.removedTypes);
      this.router.navigate(['modify']);
    }
  }

}
