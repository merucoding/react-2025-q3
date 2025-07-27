import type { Pokemon } from 'pokeapi-typescript';
import { render, screen } from '@testing-library/react';
import CardList from './CardList';

const mockPokemons = [
  {
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    sprites: {
      front_default:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==',
    },
  },
  {
    name: 'ivysaur',
    height: 10,
    weight: 130,
    sprites: {
      front_default:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==',
    },
  },
];

describe('CardList component', () => {
  it('renders correct number of pokemons when data is provided', () => {
    render(<CardList pokemons={mockPokemons as Pokemon[]} />);

    expect(screen.getAllByRole('img')).toHaveLength(mockPokemons.length);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
  });
});
