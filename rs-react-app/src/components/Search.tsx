import { Component, type ChangeEvent } from 'react';

type SearchProps = {
  onSearch: (searchText: string) => void;
};

class Search extends Component<SearchProps> {
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

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default Search;
