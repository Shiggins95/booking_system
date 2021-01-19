import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import NotFound from './Views/NotFound/NotFound';
import './App.css';
import HomeContainer from './Views/Home/Home';
import Navbar from './Components/Navbar/Navbar';

export interface RefProps {
    ref: Object,
}

function App() {
  return (
    <Router>
      <div className="top">
        <Navbar />
      </div>
      <div className="main">
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
