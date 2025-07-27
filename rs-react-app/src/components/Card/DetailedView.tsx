import { useEffect, useState } from 'react';
import { fetchPokemons } from '../../api/fetchPokemons';
import type { Pokemon } from 'pokeapi-typescript';
import Loading from '../Loading/Loading';
import { UNIT_CONVERSION } from '../../types/constants';
import { useParams } from 'react-router-dom';

export default function DetailedView() {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (pokemonName) {
      loadPokemon(pokemonName);
    }
  }, [pokemonName]);

  const loadPokemon = async (searchText: string) => {
    setLoading(true);
    setPokemon(null);
    setErrorMessage('');

    const { pokemons, errorMessage } = await fetchPokemons(searchText);

    setLoading(false);
    setPokemon(pokemons[0]);
    setErrorMessage(errorMessage);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : errorMessage ? (
        <div className="mt-8 text-fuchsia-400 font-bold text-lg">
          {errorMessage}
        </div>
      ) : (
        pokemon && (
          <>
            <div className="">
              <div className="h-[100px]">
                <img src={pokemon.sprites.front_default} alt="picture" />
              </div>
              <h2 className="text-fuchsia-400 font-bold text-lg">
                {pokemon.name}
              </h2>
              <p className="text-sm">
                height: {pokemon.height * UNIT_CONVERSION} cm, weight:{' '}
                {pokemon.weight / UNIT_CONVERSION} kg
              </p>
            </div>
          </>
        )
      )}
    </div>
  );
}
