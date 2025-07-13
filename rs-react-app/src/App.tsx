import { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Header />
        <Main />
        <ErrorButton />
      </ErrorBoundary>
    );
  }
}

export default App;
