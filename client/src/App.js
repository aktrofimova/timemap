import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout';
import Presentation from './pages/Presentation';
import SignUp from './pages/SignUp';
import TestUsers from './components/TestUsers';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Layout>
          {/* with exact the order doesn't matter, w/o exact it does */}
          {/* Switch + order is alternative to exact */}
          <Switch>
            {/*<Route path="/checkout" component={Checkout}></Route>*/}
            <Route path="/users/new" component={SignUp}></Route>
            <Route path="/users" component={TestUsers}></Route>
            <Route path="/" component={Presentation}></Route>
          </Switch>
        </Layout>

      </div>
    );
  }
}

export default App;