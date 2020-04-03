import { Component, OnInit } from '@angular/core';
import { PokemonsService, Pokemon } from '../../services/pokemons.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public pokemons: Pokemon[] = [];

  constructor(private _pokemonsService: PokemonsService) {}

  ngOnInit(): void {
    this.pokemons = this._pokemonsService.getPokemons();
    console.log(this.pokemons);
  }
}
