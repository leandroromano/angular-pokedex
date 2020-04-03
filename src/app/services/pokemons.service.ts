import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PokemonsService {
  private pokemons: Pokemon[] = [
    {
      name: 'Pikachu',
      level: 5,
      types: ['Normal', 'Electric']
    },
    {
      name: 'Charmander',
      level: 3,
      types: ['Fire']
    },
    {
      name: 'Squirtle',
      level: 4,
      types: ['Water']
    },
    {
      name: 'Eevee',
      level: 2,
      types: ['Normal']
    }
  ];

  getPokemons(): Pokemon[] {
    return this.pokemons;
  }

  constructor() {
    console.log('Service working');
  }
}

export interface Pokemon {
  name: string;
  level: number;
  types: string[];
}
