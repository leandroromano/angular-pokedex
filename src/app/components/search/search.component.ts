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
  constructor(private _pokemonsService: PokemonsService) {}

  ngOnInit(): void {}

  handleInfoClick(): void {
    this.setAllFalse();
    this.infoSelected = !this.infoSelected;
  }

  handleAbilitiesClick(): void {
    this.setAllFalse();
    this.abilitiesSelected = !this.abilitiesSelected;
  }

  handleEvolutionsClick(): void {
    this.setAllFalse();
    this.evolutionsSelected = !this.evolutionsSelected;
  }

  setAllFalse(): void {
    this.infoSelected = false;
    this.abilitiesSelected = false;
    this.evolutionsSelected = false;
  }
}
