import { Component } from 'react';

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
      <button onClick={() => this.setState({ showError: true })}>
        Trigger Error
      </button>
    );
  }
}

export default ErrorButton;
