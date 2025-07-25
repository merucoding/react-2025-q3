import { useState, type ChangeEvent } from 'react';
import { Eraser, Search } from 'lucide-react';
import { BORDER_STYLES } from '../../types/constants';
import ErrorButton from '../ErrorButton/ErrorButton';

type SearchProps = {
  searchText: string;
  onSearch: (searchText: string) => void;
};

export default function TopControls({ searchText, onSearch }: SearchProps) {
  const [input, setInput] = useState(searchText);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSearch = () => {
    const trimmedValue = input.trim();
    onSearch(trimmedValue);
  };

  const handleClear = () => {
    setInput('');
  };

  return (
    <div className="flex justify-center gap-4 mt-8 flex-wrap">
      <input
        data-testid="input"
        type="text"
        value={input}
        onChange={handleChange}
        className={BORDER_STYLES}
      />
      <button
        onClick={handleClear}
        className={`${BORDER_STYLES} hover:bg-fuchsia-300 hover:text-white`}
      >
        <Eraser />
      </button>
      <button
        data-testid="search-button"
        onClick={handleSearch}
        className={`${BORDER_STYLES} hover:bg-fuchsia-300 hover:text-white`}
      >
        <Search />
      </button>
      <ErrorButton />
    </div>
  );
}
