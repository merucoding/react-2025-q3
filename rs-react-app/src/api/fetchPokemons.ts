import type { Pokemon } from 'pokeapi-typescript';
import { isPokemonListResponse } from './isPokemonListResponse';
import { getErrorMessage } from './getErrorMessage';
import { POKEMON_BY_NAME_URL, POKEMON_LIST_URL } from '../types/constants';

export async function fetchPokemons(searchText: string): Promise<{
  pokemons: Pokemon[];
  errorMessage: string;
}> {
  try {
    if (searchText) {
      const response = await fetch(`${POKEMON_BY_NAME_URL}${searchText}`);
      if (!response.ok) {
        const message = getErrorMessage(response.status, searchText);
        return { pokemons: [], errorMessage: message };
      }
      const pokemon: Pokemon = await response.json();
      return { pokemons: [pokemon], errorMessage: '' };
    } else {
      const response = await fetch(POKEMON_LIST_URL);
      const data: unknown = await response.json();
      if (isPokemonListResponse(data)) {
        const results = data.results;
        const pokemonList: Pokemon[] = await Promise.all(
          results.map(async (item) => {
            const response = await fetch(item.url);
            return await response.json();
          })
        );
        return { pokemons: pokemonList, errorMessage: '' };
      }
      return { pokemons: [], errorMessage: 'Invalid response' };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return { pokemons: [], errorMessage: 'Unknown error' };
  }
}
