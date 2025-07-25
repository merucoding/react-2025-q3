import type { Pokemon } from 'pokeapi-typescript';
import CardList from '../CardList/CardList';
import Loading from '../Loading/Loading';
import { fetchPokemons } from '../../api/fetchPokemons';
import { LOCAL_STORAGE_QUERY_KEY } from '../../types/constants';
import TopControls from '../TopControls/TopControls';
import { useEffect, useState } from 'react';

export default function Main() {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchText, setSearchText] = useState(
    localStorage.getItem(LOCAL_STORAGE_QUERY_KEY) || ''
  );
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadPokemons(searchText);
  }, [searchText]);

  const loadPokemons = async (searchText: string) => {
    setLoading(true);
    setPokemons([]);
    setErrorMessage('');

    const { pokemons, errorMessage } = await fetchPokemons(searchText);

    setLoading(false);
    setPokemons(pokemons);
    setErrorMessage(errorMessage);
  };

  const handleSearch = (searchText: string) => {
    localStorage.setItem(LOCAL_STORAGE_QUERY_KEY, searchText);
    setSearchText(searchText);
  };

  return (
    <main className="font-lexend-exa text-emerald-500 font-light">
      <TopControls onSearch={handleSearch} />
      {loading ? (
        <Loading />
      ) : errorMessage ? (
        <div className="mt-8 text-fuchsia-400 font-bold text-lg">
          {errorMessage}
        </div>
      ) : (
        <CardList pokemons={pokemons} />
      )}
    </main>
  );
}
