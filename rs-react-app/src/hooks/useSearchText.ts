import { useState } from 'react';
import { LOCAL_STORAGE_QUERY_KEY } from '../types/constants';

export function useSearchText(): [string, (searchText: string) => void] {
  const [searchText, setSearchTextState] = useState(
    localStorage.getItem(LOCAL_STORAGE_QUERY_KEY) || ''
  );

  const setSearchText = (searchText: string) => {
    localStorage.setItem(LOCAL_STORAGE_QUERY_KEY, searchText);
    setSearchTextState(searchText);
  };

  return [searchText, setSearchText];
}
