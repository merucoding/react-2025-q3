import type { Pokemon } from 'pokeapi-typescript';
import Card from '../Card/Card';
import { Link, useParams } from 'react-router-dom';

type CardListProps = {
  pokemons: Pokemon[];
};

export default function CardList({ pokemons }: CardListProps) {
  const { page = '1' } = useParams();

  return (
    <div className="mt-6 flex gap-4 flex-wrap justify-center">
      {pokemons.map((pokemon, index) => (
        <Link key={pokemon.id} to={`/${page}/${pokemon.name}`}>
          <Card key={index} pokemon={pokemon} />
        </Link>
      ))}
    </div>
  );
}
