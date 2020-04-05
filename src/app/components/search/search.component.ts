import { Component, OnInit } from '@angular/core';
import { PokemonsService, Pokemon } from '../../services/pokemons.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  pokemon: Pokemon;
  infoSelected: boolean = false;
  abilitiesSelected: boolean = false;
  evolutionsSelected: boolean = false;
  showWarning: boolean = false;
  searchInput: string;
  constructor(private _pokemonsService: PokemonsService) {}

  ngOnInit(): void {}

  setAllFalse(): void {
    this.infoSelected = false;
    this.abilitiesSelected = false;
    this.evolutionsSelected = false;
  }

  handleClickTable(selectedButton: string): void {
    this.pokemon = this._pokemonsService.getPokemon(this.searchInput);
    this.setAllFalse();
    if (this.pokemon === undefined) {
      this.showWarning = true;
    } else {
      this.showWarning = false;
      switch (selectedButton) {
        case 'info':
          this.infoSelected = true;
          break;
        case 'abilities':
          this.abilitiesSelected = true;
          break;
        case 'evolutions':
          this.evolutionsSelected = true;
      }
    }
  }
}
