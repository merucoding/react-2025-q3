import type { Pokemon } from 'pokeapi-typescript';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import { UNIT_CONVERSION } from '../types/constants';

const mockPokemon = {
  name: 'pikachu',
  height: 4,
  weight: 60,
  sprites: {
    front_default:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==',
  },
};

describe('Card component', () => {
  it('displays pokemon name and description correctly', () => {
    render(<Card pokemon={mockPokemon as Pokemon} />);

    const image = screen.getByRole('img');
    expect(screen.getByText(mockPokemon.name)).toBeInTheDocument();
    expect(
      screen.getByText(
        `height: ${mockPokemon.height * UNIT_CONVERSION} cm, weight: ${mockPokemon.weight / UNIT_CONVERSION} kg`
      )
    ).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockPokemon.sprites.front_default);
    expect(image).toHaveAttribute('alt', 'picture');
  });
});
