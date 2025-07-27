import TopControls from './TopControls';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LOCAL_STORAGE_QUERY_KEY } from '../../types/constants';

describe('TopControls component', () => {
  it('renders search input and buttons', () => {
    render(<TopControls onSearch={vi.fn()} />);

    expect(screen.getByTestId('input')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem(LOCAL_STORAGE_QUERY_KEY, 'pikachu');
    render(<TopControls onSearch={vi.fn()} />);
    expect(screen.getByTestId('input')).toHaveValue('pikachu');
  });

  it('shows empty input when no saved term exists', () => {
    localStorage.removeItem(LOCAL_STORAGE_QUERY_KEY);
    render(<TopControls onSearch={vi.fn()} />);
    expect(screen.getByTestId('input')).toHaveValue('');
  });

  it('updates input value when user types', () => {
    render(<TopControls onSearch={vi.fn()} />);

    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'ditto' } });
    expect(input).toHaveValue('ditto');
  });

  it('calls handleSearch when search button is clicked', () => {
    const onSearchMock = vi.fn();
    render(<TopControls onSearch={onSearchMock} />);

    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: ' ditto ' } });
    fireEvent.click(screen.getByTestId('search-button'));
    expect(onSearchMock).toHaveBeenCalledWith('ditto');
  });
});
