import React, { Component } from 'react';
import Aux from './Aux';
import AppBarTM from '../components/AppBarTM';

class Layout extends Component {
  render () {
    return (
      <Aux>
        <AppBarTM />
        <main>
          {this.props.children}
        </main>
      </Aux>
    );
  };
}

export default Layout;