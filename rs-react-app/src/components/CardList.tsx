import type { Pokemon } from 'pokeapi-typescript';
import { Component } from 'react';
import Card from './Card';

type CardListProps = {
  pokemons: Pokemon[];
};

class CardList extends Component<CardListProps> {
  render() {
    const { pokemons } = this.props;

    return (
      <div>
        {pokemons.map((pokemon, index) => (
          <Card key={index} pokemon={pokemon} />
        ))}
      </div>
    );
  }
}

export default CardList;
