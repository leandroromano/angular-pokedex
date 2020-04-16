import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class PokemonsService {
  private pokemons: Pokemon[] = [
    {
      name: 'Pikachu',
      level: 5,
      types: [electric],
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
          types: [electric, psychic],
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
          types: [fire],
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
          types: [water],
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
          types: [fire],
        },
        {
          name: 'Jolteon',
          levelRequired: 50,
          types: [electric],
        },
        {
          name: 'Vaporeon',
          levelRequired: 50,
          types: [water],
        },
      ],
    },
    {
      name: 'Bulbasaur',
      level: 4,
      types: [grass, poison],
      abilities: [
        {
          name: 'Razor Leaf',
          damage: 40,
        },
      ],
      evolutions: [
        {
          name: 'Venusaur',
          levelRequired: 100,
          types: [grass, poison],
        },
      ],
    },
    {
      name: 'Abra',
      level: 7,
      types: [psychic],
      abilities: [
        {
          name: 'Confusion',
          damage: 30,
        },
      ],
      evolutions: [
        {
          name: 'Alakazam',
          levelRequired: 70,
          types: [psychic],
        },
      ],
    },
  ];


  private types: PokemonType[] = [fire, water, electric, normal, grass, poison, psychic];

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

  addPokemon(pokemonName: string, pokemonLevel: string, PokemonTypes: string[]): void {
    let pokemon: Pokemon = {
      name: pokemonName,
      level: Number(pokemonLevel),
      types: PokemonTypes.map((typeName: string) => this.getType(typeName)),
      abilities: [],
      evolutions: []
    };
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

  getType(typeName: string): PokemonType {
    return this.types.find(type => type.name === typeName);
  }

  updateTypes(pokemonName: string, typesToAdd: PokemonType[], typesToRemove: PokemonType[]) {
    let pokemonToUpdate = this.getPokemon(pokemonName);
    pokemonToUpdate.types.concat(typesToAdd);
    //Filtro de vuelta en caso de que lo hayan removido y añadido
    typesToRemove = typesToRemove.filter(type => !typesToAdd.includes(type))
    pokemonToUpdate.types = pokemonToUpdate.types.filter(type => !typesToRemove.includes(type))
    this.updatePokemon(pokemonToUpdate);
  }

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

  updatePokemonEvolutions(pokemonName: string, evolutionName: string, evolutionLevel: string, evolutionTypesString: string[]) {
    let pokemonToUpdate = this.getPokemon(pokemonName);
    let newEvolution: Evolution = {
      name: evolutionName,
      levelRequired: Number(evolutionLevel),
      types: evolutionTypesString.map(type => this.getType(type))
    }
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
  types: PokemonType[];
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

export const grass: PokemonType = {
  name: "Grass",
  backgroundColor: '#9bcc50',
  textColor: '#212121'
}

export const poison: PokemonType = {
  name: "Poison",
  backgroundColor: '#b97fc9',
  textColor: '#fff'
}

export const psychic: PokemonType = {
  name: "Psychic",
  backgroundColor: '#f366b9',
  textColor: '#fff'
}
