import { Component } from 'react';
import type { Pokemon } from 'pokeapi-typescript';

type MainState = {
  loading: boolean;
  pokemons: Pokemon[];
  searchText: string;
  errorMessage: string;
};

interface PokemonListResponse {
  results: { url: string }[];
}

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
      this.setState({
        loading: false,
        errorMessage: error instanceof Error ? error.message : 'Unknown Error',
      });
      console.error(error);
    }
  }

  render() {
    return <div></div>;
  }
}

export default Main;
