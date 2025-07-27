import { render, screen, fireEvent } from '@testing-library/react';
import ErrorButton from './ErrorButton';
import { vi } from 'vitest';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

describe('ErrorButton component', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('throws error when test button is clicked', () => {
    expect(() => {
      render(<ErrorButton />);

      fireEvent.click(screen.getByRole('button', { name: 'trigger error' }));
    }).toThrow('Test Error Boundary');
  });

  it('triggers error boundary fallback UI', () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByRole('button', { name: 'trigger error' }));
    expect(screen.getByText('Something went wrong..')).toBeInTheDocument();
  });
});
