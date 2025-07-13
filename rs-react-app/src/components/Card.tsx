import type { Pokemon } from 'pokeapi-typescript';
import { Component } from 'react';

type CardProps = {
  pokemon: Pokemon;
};

class Card extends Component<CardProps> {
  render() {
    const { pokemon } = this.props;

    return (
      <div>
        <h2>{pokemon.name}</h2>
        <p>
          Height: {pokemon.height}, Weight {pokemon.weight}
        </p>
        <img src={pokemon.sprites.front_default} alt="picture" />
      </div>
    );
  }
}

export default Card;
