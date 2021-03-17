import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import NotFound from './Views/NotFound/NotFound';
import './App.css';
import HomeContainer from './Views/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import AvailabilityContainer from './Views/Availability/Availability';

function App() {
  return (
    <Router>
      <div className="top">
        <Navbar />
      </div>
      <div className="main">
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route path="/availability/" component={AvailabilityContainer} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
