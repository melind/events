import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import {API} from 'aws-amplify';
import './App.css';

function App() {
  const [todayEvents, setTodayEvents] = useState([]);

     async function TodayEventsList() { 
         const TodayEventsInfo = await API.get('ewwapi', '/{location}/today')
         .then(res => {
          
             return res.data.todayEvents.events.event;
         })
         .catch(err => {

         });

         // setting variable with the datacolected
         setTodayEvents(TodayEventsInfo);
     
     }

      useEffect(() => {
       TodayEventsList();
       }, []); 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
                {todayEvents.map((result) =>
                 <div key={result.id}> 
                     {result.title}  {result.start_time}
                     {result.venue_name} {result.venue_address} 
                     {result.city_name} {result.region_name} 
                     <Link to={`/description/${result.title}/${result.id}`}>Plus d'info</Link>
                 </div>
                 )} 
                               
        </div>
    </div>
  );
}

export default App;
