/* eslint-disable no-magic-numbers */
import { fetchPokemons } from './fetchPokemons';
import { describe, it, expect } from 'vitest';

describe('fetchPokemons', () => {
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

  it('handles error when pokemon not found by searchText', async () => {
    const { pokemons, errorMessage } = await fetchPokemons('bbb');
    expect(pokemons).toEqual([]);
    expect(errorMessage).toMatch('Error 404: Pokemon "bbb" not found');
  });

  it('handles client error', async () => {
    const { pokemons, errorMessage } = await fetchPokemons('p.');
    expect(pokemons).toEqual([]);
    expect(errorMessage).toMatch('Client error 400');
  });
});
