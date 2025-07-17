import { Component, type ChangeEvent } from 'react';
import ErrorButton from './ErrorButton';
import { Eraser, Search } from 'lucide-react';
import { BORDER_STYLES, LOCAL_STORAGE_QUERY_KEY } from '../types/constants';

type SearchProps = {
  onSearch: (searchText: string) => void;
};

export default class TopControls extends Component<SearchProps> {
  state = {
    input: localStorage.getItem(LOCAL_STORAGE_QUERY_KEY) || '',
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: event.target.value });
  };

  handleSearch = () => {
    const trimmedValue = this.state.input.trim();
    this.props.onSearch(trimmedValue);
  };

  handleClear = () => {
    this.setState({ input: '' });
  };

  render() {
    return (
      <div className="flex justify-center gap-x-4 mt-8">
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleChange}
          className={BORDER_STYLES}
        />
        <button
          onClick={this.handleClear}
          className={`${BORDER_STYLES} hover:bg-fuchsia-300 hover:text-white`}
        >
          <Eraser />
        </button>
        <button
          onClick={this.handleSearch}
          className={`${BORDER_STYLES} hover:bg-fuchsia-300 hover:text-white`}
        >
          <Search />
        </button>
        <ErrorButton />
      </div>
    );
  }
}
