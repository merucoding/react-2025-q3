import { Component } from 'react';
import type { Pokemon } from 'pokeapi-typescript';
import CardList from './CardList';
import TopControls from './TopControls';
import Loading from './Loading';
import { fetchPokemons } from '../api/fetchPokemons';

type MainState = {
  loading: boolean;
  pokemons: Pokemon[];
  searchText: string;
  errorMessage: string;
};

export default class Main extends Component {
  state: MainState = {
    loading: false,
    pokemons: [],
    searchText: localStorage.getItem('searchText') || '',
    errorMessage: '',
  };

  componentDidMount(): void {
    this.loadPokemons(this.state.searchText);
  }

  async loadPokemons(searchText: string): Promise<void> {
    this.setState({ loading: true, pokemons: [], errorMessage: '' });
    const { pokemons, errorMessage } = await fetchPokemons(searchText);
    this.setState({ loading: false, pokemons, errorMessage });
  }

  handleSearch = (searchText: string) => {
    localStorage.setItem('searchText', searchText);
    this.setState({ searchText: searchText });
    this.loadPokemons(searchText);
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
