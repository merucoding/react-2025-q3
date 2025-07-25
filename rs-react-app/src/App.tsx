import { Component } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

export default class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Header />
        <Main />
      </ErrorBoundary>
    );
  }
}
