import { Component } from 'react';

export default class Loading extends Component {
  render() {
    return (
      <div
        data-testid="spinner"
        className="flex justify-center items-center h-100"
      >
        <div className="w-8 h-8 border-4 border-fuchsia-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
}
