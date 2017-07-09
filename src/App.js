import React, { Component } from 'react';
import './App.css';
import Page from './Page.js'
import Responsive from 'react-responsive';

// Default (desktop, tablet) and mobile setup
const Default = ({ children }) => <Responsive minWidth={768} children={children} />;
const Mobile = ({ children }) => <Responsive maxWidth={768} children={children} />;


class App extends Component {
  render() {
    return (
      <div>
      <Default>
      <div className="App desktop">
      < Page url='/reasons/'/>
      </div>
      </Default>
      <Mobile>
      <div className="App mobile">
      < Page url='/reasons/'/>
      </div>
      </Mobile>
      </div>
    );
  }
}

export default App;
