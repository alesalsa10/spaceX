import React from 'react';
import './app.css';
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/LandingPage/LandingPage';
import Vehicle from './components/Vehicle/Vehicle';
import Missions from './components/Missions/Missions';
import NotFound from './components/NotFound/NotFound';
import StarLink from './components/Starlink/StarLink';
import Stats from './components/Stats/Stats';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className='App' id='outer-container'>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/vehicles/:name/:id' component={Vehicle} />
          <Route path='/missions' component={Missions} />
          <Route path='/stats' component={Stats} />
          <Route path='/starlink' component={StarLink}></Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
