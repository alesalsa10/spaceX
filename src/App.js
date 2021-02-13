import React from 'react';
import './app.css';
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/LandingPage/LandingPage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' component={LandingPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
