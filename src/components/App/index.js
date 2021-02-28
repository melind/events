import React  from 'react';
import { Route, Switch, Redirect, Link} from 'react-router-dom';
import './index.css';


import Home from '../Home';
import LegalMentions from '../LegalMentions';
import Nav from '../Nav';
import NewPassword from '../NewPassword';
import NewUsername from '../NewUsername';
import NotFound from '../NotFound';
import Profile from '../Profile';
import Form from '../Form';

  
  


const App = () => {

  return (
    <div className="App">
      <header className="App-header">

      <div className="brand-header">
      <Nav />
           
                   
      </div>  
         
      </header>
      
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/authentification" exact component={Form}/>
        <Route path="/mentions-legales" exact component={LegalMentions}/>
        <Route path="/modification-mot-de-passe" exact component={NewPassword}/>
        <Route path="/modification-email" exact component={NewUsername}/>
        <Route path="/profile" exact component={Profile}/>
        <Route  path="/404" exact component={NotFound}/>
          <Redirect to="/404" />
      </Switch>
      <br/>
     contact@events-world-wide.fr | <Link to="/mentions-legales">mentions légales</Link>
    </div>
    
  );
}

export default App;
