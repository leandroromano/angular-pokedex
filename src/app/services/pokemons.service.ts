import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class PokemonsService {
  private pokemons: Pokemon[] = [
    {
      name: 'Pikachu',
      level: 5,
      types: [normal, electric],
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
          types: ['Electric', 'Normal'],
        },
      ],
    },
    {
      name: 'Charmander',
      level: 3,
      types: [fire],
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
      types: [water],
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
      types: [normal],
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


  private types: PokemonType[] = [fire, water, electric, normal];

  getPokemons(): Pokemon[] {
    return this.pokemons;
  }

  getPokemon(pokemonName: string): Pokemon {
    if (pokemonName !== undefined) {
      return this.pokemons.find((pokemon) => pokemon.name.toLowerCase() === pokemonName.toLowerCase());
    }
  }

  getTypes(): PokemonType[] {
    return this.types;
  }

  existsPokemon(name: string) {
    if (name === undefined || name === null) {
      return false;
    }
    return this.pokemons.some(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
  }

  existsEvolutionFor(pokemonName: string, evolutionName: string) {
    if (evolutionName === undefined) {
      return false;
    }
    let evolutions = this.getPokemon(pokemonName).evolutions
    return evolutions.some(evolution => evolution.name.toLowerCase() === evolutionName.toLowerCase());
  }

  addPokemon(pokemon: Pokemon): void {
    this.pokemons.push(pokemon);
  }

  updatePokemonInfo(oldName: string, newName: string, newLevel: string): void {
    let pokemonToUpdate = this.getPokemon(oldName);
    if (newName !== '') pokemonToUpdate.name = newName;
    if (newLevel !== '') pokemonToUpdate.level = Number(newLevel);
  }

  getTypesToAdd(pokemonName: string) {
    let pokemon = this.getPokemon(pokemonName);
    return this.types.filter(type => !pokemon.types.includes(type));
  }

  getTypesToDelete(pokemonName: string) {
    return this.getPokemon(pokemonName).types;
  }

  // updateTypes(pokemonName: string, typesToAdd: string[], typesToRemove: string[]) {
  //   let pokemonToUpdate = this.getPokemon(pokemonName);
  //   pokemonToUpdate.types.concat(typesToAdd);
  //   //Filtro de vuelta en caso de que lo hayan removido y añadido
  //   typesToRemove = typesToRemove.filter(type => !typesToAdd.includes(type))
  //   pokemonToUpdate.types = pokemonToUpdate.types.filter(type => !typesToRemove.includes(type))
  //   this.updatePokemon(pokemonToUpdate);
  // }

  updatePokemon(updatedPokemon: Pokemon) {
    this.pokemons.forEach(pokemon => {
      if (pokemon.name.toLowerCase() === updatedPokemon.name.toLowerCase()) {
        pokemon = updatedPokemon
      }
    })
  }

  updatePokemonAbilities(pokemonName: string, newAbility: Ability) {
    let pokemonToUpdate = this.getPokemon(pokemonName);
    pokemonToUpdate.abilities.push(newAbility);
    this.updatePokemon(pokemonToUpdate);
  }

  updatePokemonEvolutions(pokemonName: string, newEvolution: Evolution) {
    let pokemonToUpdate = this.getPokemon(pokemonName);
    pokemonToUpdate.evolutions.push(newEvolution);
    this.updatePokemon(pokemonToUpdate);
  }


  constructor() {
  }
}

export interface Pokemon {
  name: string;
  level: number;
  types: PokemonType[];
  abilities: Ability[];
  evolutions: Evolution[];
}

export interface Ability {
  name: string;
  damage: number;
}

export interface Evolution {
  name: string;
  levelRequired: number;
  types: string[];
}

export interface PokemonType {
  name: string;
  backgroundColor: string;
  textColor: string;
}


export const water: PokemonType = {
  name: "Water",
  backgroundColor: '#4592c4',
  textColor: '#fff'
}

export const fire: PokemonType = {
  name: "Fire",
  backgroundColor: '#fd7d24',
  textColor: '#fff'
}

export const electric: PokemonType = {
  name: "Electric",
  backgroundColor: '#eed535',
  textColor: '#212121'
}

export const normal: PokemonType = {
  name: "Normal",
  backgroundColor: '#a4acaf',
  textColor: '#212121'
}