import { Component } from 'react';
import type { Pokemon } from 'pokeapi-typescript';
import CardList from './CardList';
import TopControls from './TopControls';
import Loading from './Loading';

type MainState = {
  loading: boolean;
  pokemons: Pokemon[];
  searchText: string;
  errorMessage: string;
};

interface PokemonListResponse {
  results: { url: string }[];
}

export const borderStyles =
  'px-2 py-2 border-1 border-solid border-fuchsia-300 rounded-xl cursor-pointer';

function isPokemonListResponse(data: unknown): data is PokemonListResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'results' in data &&
    Array.isArray(data.results)
  );
}

class Main extends Component {
  state: MainState = {
    loading: false,
    pokemons: [],
    searchText: localStorage.getItem('searchText') || '',
    errorMessage: '',
  };

  componentDidMount(): void {
    this.fetchData(this.state.searchText);
  }

  async fetchData(searchText: string): Promise<void> {
    this.setState({ loading: true, pokemons: [], errorMessage: '' });

    try {
      if (searchText) {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${searchText}`
        );
        if (!response.ok) {
          let message = '';
          if (response.status === 404) {
            message = `Error 404: Pokemon "${searchText}" not found`;
          } else if (response.status >= 400 && response.status < 500) {
            message = `Client error (${response.status}): ${response.statusText}`;
          } else if (response.status >= 500) {
            message = `Server error (${response.status}): ${response.statusText}`;
          }
          this.setState({ loading: false, errorMessage: message });
          return;
        }

        const data: Pokemon = await response.json();
        this.setState({ pokemons: [data], loading: false });
      } else {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
        );
        const data: unknown = await response.json();
        if (isPokemonListResponse(data)) {
          const results = data.results;
          const pokemonList: Pokemon[] = await Promise.all(
            results.map(async (item) => {
              const response = await fetch(item.url);
              const data: Pokemon = await response.json();
              return data;
            })
          );
          this.setState({ pokemons: pokemonList, loading: false });
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  handleSearch = (searchText: string) => {
    localStorage.setItem('searchText', searchText);
    this.setState({ searchText: searchText });
    this.fetchData(searchText);
  };

  render() {
    const { loading, pokemons, errorMessage } = this.state;

    return (
      <main className="font-lexend-exa text-emerald-500 font-light">
        <TopControls onSearch={this.handleSearch} />
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
}

export default Main;
