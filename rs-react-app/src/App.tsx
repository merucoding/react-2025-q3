import { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import ErrorBoundary from './components/ErrorBoundary';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Header />
        <Main />
      </ErrorBoundary>
    );
  }
}

export default App;
