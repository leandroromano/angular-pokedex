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

  constructor(private pokemonsService: PokemonsService, private router: Router) { }

  ngOnInit(): void {
  }

  handleClick(option: string): void {
    if (this.pokemonsService.existsPokemon(this.nameInput)) {
      this.pokemonNotExist = false;
      this.router.navigate(['modify', this.nameInput.toLowerCase(), option]);
    }
    else {
      this.pokemonNotExist = true;
    }
  }

}
