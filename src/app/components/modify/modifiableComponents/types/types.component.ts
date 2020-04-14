import { Component, OnInit } from '@angular/core';
import { PokemonsService } from '../../../../services/pokemons.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit {

  queryParamName: string;
  pokemonTypesToDelete: string[] = [];
  pokemonTypesToAdd: string[] = [];
  addedTypes: string[] = [];
  removedTypes: string[] = [];
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

  handleAddClick(newType: string) {
    if (this.pokemonTypesToDelete.length < 1) this.notTypesError = false;
    this.addedTypes.push(newType);
    this.pokemonTypesToAdd = this.pokemonTypesToAdd.filter(type => type !== newType)
    this.pokemonTypesToDelete.push(newType)
  }

  handleRemoveClick(removedType: string) {
    this.removedTypes.push(removedType);
    this.pokemonTypesToAdd.push(removedType);
    this.pokemonTypesToDelete = this.pokemonTypesToDelete.filter(type => type !== removedType)
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
