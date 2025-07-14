import { Component, type ErrorInfo, type ReactNode } from 'react';

type ErrorBoundaryProps = { children: ReactNode };
type ErrorBoundaryState = { hasError: boolean };

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Caught an error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex justify-center items-center h-100">
          <h1 className="font-lexend-exa text-fuchsia-400 font-bold text-2xl">
            Something went wrong..
          </h1>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
