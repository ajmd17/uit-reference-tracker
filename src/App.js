import React, { Component } from 'react';

import {
  Navbar,
  NavItem,
  Card,
  CardTitle,
  Row,
  Col,
  Button
} from 'react-materialize';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar brand='RefCounter' right className='blue-grey'>
          <NavItem href='get-started.html'>Getting started</NavItem>
          <NavItem href='components.html'>Components</NavItem>
        </Navbar>

        {this.props.children}
      </div>
    );
  }
}

export default App;
