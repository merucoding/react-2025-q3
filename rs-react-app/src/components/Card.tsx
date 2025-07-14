import type { Pokemon } from 'pokeapi-typescript';
import { Component } from 'react';

type CardProps = {
  pokemon: Pokemon;
};

class Card extends Component<CardProps> {
  render() {
    const { pokemon } = this.props;

    return (
      <div className="p-2 flex flex-col items-center gap-y-2 aspect-square w-[200px] border-1 border-solid border-fuchsia-300 rounded-xl">
        <div className="h-[100px]">
          <img src={pokemon.sprites.front_default} alt="picture" />
        </div>
        <h2 className="text-fuchsia-400 font-bold text-lg">{pokemon.name}</h2>
        <p className="text-sm">
          height: {pokemon.height * 10} cm, weight: {pokemon.weight / 10} kg
        </p>
      </div>
    );
  }
}

export default Card;
