import { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <h1 className="font-logo text-4xl bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
          Pokemon Search
        </h1>
      </header>
    );
  }
}

export default Header;
