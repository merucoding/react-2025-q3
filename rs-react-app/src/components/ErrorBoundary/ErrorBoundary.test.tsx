import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import { Component, type ReactNode } from 'react';

class Error extends Component {
  render(): ReactNode {
    throw new Error('Crash Error');
  }
}

describe('ErrorBoundary component', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('catches errors in child components and displays fallback UI', () => {
    render(
      <ErrorBoundary>
        <Error />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong..')).toBeInTheDocument();
  });

  it('logs error to console', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Error />
      </ErrorBoundary>
    );

    expect(consoleErrorMock.mock.calls[1][0]).toEqual('Caught an error:');
  });
});
