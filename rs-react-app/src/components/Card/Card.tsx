import type { Pokemon } from 'pokeapi-typescript';
import { UNIT_CONVERSION } from '../../types/constants';

type CardProps = {
  pokemon: Pokemon;
};

export default function Card({ pokemon }: CardProps) {
  return (
    <div className="p-2 flex flex-col items-center gap-y-2 aspect-square w-[200px] border-1 border-solid border-fuchsia-300 rounded-xl">
      <div className="h-[100px]">
        <img src={pokemon.sprites.front_default} alt="picture" />
      </div>
      <h2 className="text-fuchsia-400 font-bold text-lg">{pokemon.name}</h2>
      <p className="text-sm">
        height: {pokemon.height * UNIT_CONVERSION} cm, weight:{' '}
        {pokemon.weight / UNIT_CONVERSION} kg
      </p>
    </div>
  );
}
