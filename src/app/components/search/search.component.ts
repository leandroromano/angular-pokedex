import { Component, OnInit } from '@angular/core';
import { PokemonsService, Pokemon } from '../../services/pokemons.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  pokemon: Pokemon;
  infoSelected: boolean = false;
  abilitiesSelected: boolean = false;
  evolutionsSelected: boolean = false;
  searchInput: string;
  constructor(private _pokemonsService: PokemonsService) {}

  ngOnInit(): void {}

  handleInfoClick(): void {
    this.pokemon = this._pokemonsService.getPokemon(this.searchInput);
    this.setAllFalse();
    this.infoSelected = !this.infoSelected;
  }

  handleAbilitiesClick(): void {
    this.pokemon = this._pokemonsService.getPokemon(this.searchInput);
    this.setAllFalse();
    this.abilitiesSelected = !this.abilitiesSelected;
  }

  handleEvolutionsClick(): void {
    this.pokemon = this._pokemonsService.getPokemon(this.searchInput);
    this.setAllFalse();
    this.evolutionsSelected = !this.evolutionsSelected;
  }

  setAllFalse(): void {
    this.infoSelected = false;
    this.abilitiesSelected = false;
    this.evolutionsSelected = false;
  }
}
