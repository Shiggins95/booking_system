import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotFound from './Views/NotFound/NotFound';
import './App.css';
import HomeContainer from './Views/Home/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
export default App;
