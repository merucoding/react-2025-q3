import { Component } from 'react';
import { borderStyles } from './Main';

type ErrorButtonState = {
  showError: boolean;
};

class ErrorButton extends Component {
  state: ErrorButtonState = {
    showError: false,
  };

  render() {
    if (this.state.showError) throw new Error('Test Error Boundary');

    return (
      <button
        onClick={() => this.setState({ showError: true })}
        className={`${borderStyles} hover:bg-fuchsia-300 hover:text-white`}
      >
        trigger error
      </button>
    );
  }
}

export default ErrorButton;
