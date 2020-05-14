import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Components/Home'
import Error from './Components/Error'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={Error} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
