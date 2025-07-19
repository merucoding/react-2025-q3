import { fetchPokemons } from './fetchPokemons';
import { describe, it, expect, vi } from 'vitest';
import * as checkResponse from './isPokemonListResponse';

describe('fetchPokemons', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns a single pokemon (with searchText)', async () => {
    const { pokemons, errorMessage } = await fetchPokemons('pikachu');
    expect(pokemons).toHaveLength(1);
    expect(pokemons[0].name).toBe('pikachu');
    expect(errorMessage).toBe('');
  });

  it('returns a list of pokemons (without searchText)', async () => {
    const { pokemons, errorMessage } = await fetchPokemons('');
    expect(pokemons).toEqual(
      expect.arrayContaining([
        { name: 'bulbasaur', height: 7, weight: 69 },
        { name: 'ivysaur', height: 10, weight: 130 },
      ])
    );
    expect(errorMessage).toBe('');
  });

  it('returns an error when pokemon not found by searchText', async () => {
    const { pokemons, errorMessage } = await fetchPokemons('bbb');
    expect(pokemons).toEqual([]);
    expect(errorMessage).toBe('Error 404: Pokemon "bbb" not found');
  });

  it('returns a client error message for invalid input', async () => {
    const { pokemons, errorMessage } = await fetchPokemons('p.');
    expect(pokemons).toEqual([]);
    expect(errorMessage).toBe('Client error 400');
  });

  it('returns a server error message', async () => {
    const { pokemons, errorMessage } = await fetchPokemons('forServerError');
    expect(pokemons).toEqual([]);
    expect(errorMessage).toBe('Server error 500');
  });

  it('returns an error when the response is invalid', async () => {
    vi.spyOn(checkResponse, 'isPokemonListResponse').mockReturnValue(false);
    const { pokemons, errorMessage } = await fetchPokemons('');
    expect(pokemons).toEqual([]);
    expect(errorMessage).toBe('Invalid response');
  });
});
