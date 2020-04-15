import { Component, OnInit } from '@angular/core';
import { PokemonsService } from '../../services/pokemons.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {

  nameInput: string;
  pokemonNotExist: boolean;

  constructor(private pokemonsService: PokemonsService, private router: Router) {
    this.getFromLocalStorage();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    let next_rout = this.router.routerState.snapshot.url as string;
    if (!next_rout.includes("modify")) localStorage.clear();
  }

  handleClick(option: string): void {
    if (this.pokemonsService.existsPokemon(this.nameInput)) {
      this.pokemonNotExist = false;
      this.saveLocalStorage();
      this.router.navigate(['modify', this.nameInput.toLowerCase(), option]);
    }
    else {
      this.pokemonNotExist = true;
    }
  }

  saveLocalStorage() {
    let pokemonTyped = this.nameInput;
    localStorage.setItem("pokemonTyped", pokemonTyped);
  }

  getFromLocalStorage() {
    let pokemonTyped = localStorage.getItem('pokemonTyped');
    if (pokemonTyped !== undefined && pokemonTyped !== '') {
      this.nameInput = pokemonTyped;
    }
  }

}
