import React ,{useEffect, useState} from 'react';
import { Route, Switch, Redirect, Link} from 'react-router-dom';
import { Auth, Hub } from 'aws-amplify'
import './index.css';


import EventInfo from '../EventInfo';
import Home from '../Home';
import Nav from '../Nav';
import NotFound from '../NotFound';
import Profile from '../Profile';
import Form from '../Form';
import SignOut from '../SignOut';
import TodayEvents from '../TodayEvents';
import WeekEvents from '../WeekEvents';

  
  


const App = () => {

  const [user, setUser] = useState(null) 
  async function checkUser() {
    try {
      const data = await Auth.currentUserPoolUser()
      const userInfo = { username: data.username, ...data.attributes }
      setUser(userInfo)
    } catch (err) { console.log('error: ', err) }
  }
 
  const displayAuth = () => {
       const auth = document.getElementsByClassName('auth')[0]  ;
       const un = document.getElementsByClassName('un')[0]  ;
        if(user) {
            auth.style.display='block';
            un.style.display='none';
          }
          
         
        }
   if(user) { 
     displayAuth()
     }
  useEffect(() => {
      checkUser()
            Hub.listen('auth', (data) => {
              const { payload } = data
              if (payload.event === 'signOut') {
                setUser(null)
              }
            })
    
  }, [])

  
  return (
    <div className="App">
      <header className="App-header">

      <div className="brand-header">

           <div className="brand-name">
                World Wide Event
           </div>

           <div className="authentification">

              <div className="un authentificated">
               <Link to="/authentification"> S'authentifier </Link >
              </div>
              
              <div className=" auth authentificated">
              <SignOut user={user}/>
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
        <Route restricted={false} path="/authentification" exact component={Form}/>
        <Route restricted={false} path="/profile" exact component={Profile}/>
        <Route restricted={false}  path="/404" exact component={NotFound}/>
          <Redirect to="/404" />
      </Switch>
    </div>
  );
}

export default App;
