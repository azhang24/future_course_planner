import React, { Component } from 'react';
import './App.css';
import Header from "./components/Header"
import Main from "./components/Main"

class App extends Component {
  render() {
    return (
      <center>
        <div className="App">
          <Header />
          <br/>
          <Main />
        </div>
      </center>
    );
  }
}

export default App;
