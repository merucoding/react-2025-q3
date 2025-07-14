import { Component, type ChangeEvent } from 'react';
import ErrorButton from './ErrorButton';
import { borderStyles } from './Main';
import { Eraser, Search } from 'lucide-react';

type SearchProps = {
  onSearch: (searchText: string) => void;
};

class TopControls extends Component<SearchProps> {
  state = {
    input: localStorage.getItem('searchText') || '',
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
          className={borderStyles}
        />
        <button
          onClick={this.handleClear}
          className={`${borderStyles} hover:bg-fuchsia-300 hover:text-white`}
        >
          <Eraser />
        </button>
        <button
          onClick={this.handleSearch}
          className={`${borderStyles} hover:bg-fuchsia-300 hover:text-white`}
        >
          <Search />
        </button>
        <ErrorButton />
      </div>
    );
  }
}

export default TopControls;
