import React ,{useEffect} from 'react';
import { Route, Switch, Redirect, Link} from 'react-router-dom';

import './index.css';


import Account from '../../containers/Account';
import EventInfo from '../EventInfo';
import Home from '../Home';
import Nav from '../Nav';
import TodayEvents from '../TodayEvents';
import UserName from '../../containers/UserName';
import WeekEvents from '../WeekEvents';

const App = () => {

  
  return (
    <div className="App">
      <header className="App-header">

      <div className="brand-header">

           <div className="brand-name">
                World Wide Event
           </div>

           <div className="authentification">

              <div className="un authentificated">
               <Link to="/inscrivez-vous"> signup</Link >                
               <Link to="/connectez-vous"> login</Link >
              </div>
              
              <div className=" auth authentificated">
                < Loggedout/>
              </div>
           </div>
                   
      </div>  
         
      </header>
      <Nav />
      <Switch>
        <Route restricted={false} path="/" exact component={Home}/>
        <Route restricted={false} path="/:location/aujourdhui" exact component={TodayEvents}/>
        <Route restricted={false} path="/:location/semaine" exact component={WeekEvents}/>
        <Route restricted={false} path="/description/:eventName/:idEvent" exact component={EventInfo}/>
        <Route path="/compte" exact component={Account}/>
        <Route restricted={false}  path="/404" exact component={NotFound}/>
          <Redirect to="/404" />
      </Switch>
    </div>
  );
}

export default App;
