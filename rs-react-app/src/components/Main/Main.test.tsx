import * as fetchPokemons from '../../api/fetchPokemons';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Main from './Main';
import { LOCAL_STORAGE_QUERY_KEY } from '../../types/constants';
import type { Pokemon } from 'pokeapi-typescript';

describe('Main component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });
  const mockFetchPokemons = vi.spyOn(fetchPokemons, 'fetchPokemons');

  it('makes initial API call on component mount', async () => {
    mockFetchPokemons.mockResolvedValue({
      pokemons: [],
      errorMessage: '',
    });

    render(<Main />);
    await waitFor(() => {
      expect(mockFetchPokemons).toHaveBeenCalledWith('');
    });
  });

  it('loads search term from localStorage on initial load', async () => {
    localStorage.setItem(LOCAL_STORAGE_QUERY_KEY, 'pikachu');
    mockFetchPokemons.mockResolvedValue({
      pokemons: [],
      errorMessage: '',
    });

    render(<Main />);
    await waitFor(() => {
      expect(mockFetchPokemons).toHaveBeenCalledWith('pikachu');
    });
  });

  it('handles successful API responses', async () => {
    mockFetchPokemons.mockResolvedValueOnce({
      pokemons: [
        {
          name: 'bulbasaur',
          height: 7,
          weight: 69,
          sprites: {
            front_default:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==',
          },
        } as Pokemon,
      ],
      errorMessage: '',
    });

    render(<Main />);
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
  });

  it('handles API error responses', async () => {
    mockFetchPokemons.mockResolvedValueOnce({
      pokemons: [],
      errorMessage: 'Client error 400',
    });

    render(<Main />);
    await waitFor(() => {
      expect(screen.getByText('Client error 400')).toBeInTheDocument();
    });
  });

  it('updates component state based on API responses', async () => {
    mockFetchPokemons.mockResolvedValueOnce({
      pokemons: [
        {
          name: 'ivysaur',
          height: 10,
          weight: 130,
          sprites: {
            front_default:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==',
          },
        } as Pokemon,
      ],
      errorMessage: '',
    });

    render(<Main />);
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'ivysaur' } });
    fireEvent.click(screen.getByTestId('search-button'));
    await waitFor(() => {
      expect(mockFetchPokemons).toHaveBeenCalledWith('ivysaur');
      expect(localStorage.getItem(LOCAL_STORAGE_QUERY_KEY)).toBe('ivysaur');
    });
  });
});
