import type { Pokemon } from 'pokeapi-typescript';
import { Component } from 'react';
import Card from '../Card/Card';

type CardListProps = {
  pokemons: Pokemon[];
};

export default class CardList extends Component<CardListProps> {
  render() {
    const { pokemons } = this.props;

    return (
      <div className="mt-6 flex gap-4 flex-wrap justify-center">
        {pokemons.map((pokemon, index) => (
          <Card key={index} pokemon={pokemon} />
        ))}
      </div>
    );
  }
}
