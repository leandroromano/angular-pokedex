import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class PokemonsService {
  private pokemons: Pokemon[] = [
    {
      name: 'Pikachu',
      level: 5,
      types: ['Normal', 'Electric'],
      abilities: [
        {
          name: 'Thunder',
          damage: 100,
        },
        {
          name: 'Electro Ball',
          damage: 75,
        },
      ],
      evolutions: [
        {
          name: 'Raichu',
          levelRequired: 50,
          types: ['Electric, Normal'],
        },
      ],
    },
    {
      name: 'Charmander',
      level: 3,
      types: ['Fire'],
      abilities: [
        {
          name: 'Fire',
          damage: 25,
        },
      ],
      evolutions: [
        {
          name: 'Dragonite',
          levelRequired: 100,
          types: ['fire'],
        },
      ],
    },
    {
      name: 'Squirtle',
      level: 4,
      types: ['Water'],
      abilities: [
        {
          name: 'Splash',
          damage: 30,
        },
      ],
      evolutions: [
        {
          name: 'Blastoise',
          levelRequired: 100,
          types: ['water'],
        },
      ],
    },
    {
      name: 'Eevee',
      level: 2,
      types: ['Normal'],
      abilities: [
        {
          name: 'Bite',
          damage: 40,
        },
      ],
      evolutions: [
        {
          name: 'Floreon',
          levelRequired: 50,
          types: ['Fire'],
        },
        {
          name: 'Jolteon',
          levelRequired: 50,
          types: ['Electric'],
        },
        {
          name: 'Vaporeon',
          levelRequired: 50,
          types: ['Water'],
        },
      ],
    },
  ];

  private types: string[] = ["Water", "Fire", "Electric", "Normal"]

  getPokemons(): Pokemon[] {
    return this.pokemons;
  }

  getPokemon(pokemonName: string): Pokemon {
    return this.pokemons.find((pokemon) => pokemon.name.toLowerCase() === pokemonName.toLowerCase());
  }

  getTypes(): string[] {
    return this.types;
  }

  existsPokemon(name: string) {
    if (name === undefined) {
      return false;
    }
    return this.pokemons.some(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
  }

  addPokemon(pokemon: Pokemon) {
    this.pokemons.push(pokemon);
  }

  modifyPokemonInfo(oldName: string, newName: string, newLevel: string) {
    let pokemonToModify = this.getPokemon(oldName);
    if (newName !== '') pokemonToModify.name = newName;
    if (newLevel !== '') pokemonToModify.level = Number(newLevel);
  }


  constructor() {
    console.log('Service working');
  }
}

export interface Pokemon {
  name: string;
  level: number;
  types: string[];
  abilities: Ability[];
  evolutions: Evolution[];
}

interface Ability {
  name: string;
  damage: number;
}

interface Evolution {
  name: string;
  levelRequired: number;
  types: string[];
}
