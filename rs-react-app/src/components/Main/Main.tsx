import type { Pokemon } from 'pokeapi-typescript';
import CardList from '../CardList/CardList';
import Loading from '../Loading/Loading';
import { fetchPokemons } from '../../api/fetchPokemons';
import TopControls from '../TopControls/TopControls';
import { useEffect, useState } from 'react';
import { useSearchText } from '../../hooks/useSearchText';
import PaginationControls from './PaginationControls';
import { useNavigate, useParams } from 'react-router-dom';
import DetailedView from '../Card/DetailedView';

export default function Main() {
  const [searchText, setSearchText] = useSearchText();
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { page = '1', pokemonName } = useParams();
  const currentPage = Number(page);
  const navigate = useNavigate();

  useEffect(() => {
    loadPokemons(searchText, currentPage);
  }, [searchText, currentPage]);

  const handlePageChange = (newPage: number) => {
    navigate(`/${newPage}/${pokemonName ?? ''}`);
  };

  const loadPokemons = async (searchText: string, page: number) => {
    setLoading(true);
    setPokemons([]);
    setErrorMessage('');

    const { pokemons, errorMessage } = await fetchPokemons(searchText, page);

    setLoading(false);
    setPokemons(pokemons);
    setErrorMessage(errorMessage);
  };

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  return (
    <main className="font-lexend-exa text-emerald-500 font-light">
      <TopControls searchText={searchText} onSearch={handleSearch} />
      {loading ? (
        <Loading />
      ) : errorMessage ? (
        <div className="mt-8 text-fuchsia-400 font-bold text-lg">
          {errorMessage}
        </div>
      ) : (
        <>
          <CardList pokemons={pokemons} />
          {pokemonName && <DetailedView />}
          {!searchText && pokemons.length > 0 && (
            <PaginationControls page={currentPage} setPage={handlePageChange} />
          )}
        </>
      )}
    </main>
  );
}
