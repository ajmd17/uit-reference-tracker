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
        <Navbar brand='RefCounter' right className='teal lighten-3'/>

        {this.props.children}
      </div>
    );
  }
}

export default App;
