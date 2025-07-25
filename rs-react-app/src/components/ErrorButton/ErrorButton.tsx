import { Component } from 'react';
import { BORDER_STYLES } from '../types/constants';

type ErrorButtonState = {
  showError: boolean;
};

export default class ErrorButton extends Component {
  state: ErrorButtonState = {
    showError: false,
  };

  render() {
    if (this.state.showError) throw new Error('Test Error Boundary');

    return (
      <button
        onClick={() => this.setState({ showError: true })}
        className={`${BORDER_STYLES} hover:bg-fuchsia-300 hover:text-white`}
      >
        trigger error
      </button>
    );
  }
}
