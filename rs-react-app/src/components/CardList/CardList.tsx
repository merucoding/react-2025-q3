import type { Pokemon } from 'pokeapi-typescript';
import Card from '../Card/Card';

type CardListProps = {
  pokemons: Pokemon[];
};

export default function CardList({ pokemons }: CardListProps) {
  return (
    <div className="mt-6 flex gap-4 flex-wrap justify-center">
      {pokemons.map((pokemon, index) => (
        <Card key={index} pokemon={pokemon} />
      ))}
    </div>
  );
}
