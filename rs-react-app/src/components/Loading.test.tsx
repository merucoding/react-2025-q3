import { render, screen, waitFor } from '@testing-library/react';
import Loading from './Loading';
import Main from './Main';
import { vi } from 'vitest';
import * as fetchPokemons from '../api/fetchPokemons';

describe('Loading component', () => {
  it('renders spinner', () => {
    render(<Loading />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('shows and hides spinner based on loading state', async () => {
    vi.spyOn(fetchPokemons, 'fetchPokemons').mockResolvedValue({
      pokemons: [],
      errorMessage: '',
    });

    render(<Main />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
    );
  });
});
