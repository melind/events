import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import {API} from 'aws-amplify';
import './App.css';

function App() {
  const [todayEvents, setTodayEvents] = useState([]);
  const [location, setLocation] = useState("france");
     async function TodayEventsList() {  
         
         const TodayEventsInfo = await API.get('ewwapi', `/${location}/today`)
         console.log('today : ', TodayEventsInfo, TodayEventsInfo.todayEvents.events.event )
        // return TodayEventsInfo, TodayEventsInfo.data.events.event
         /*.then(res => {
            console.log('today : ' ,res.data, res.data.data.events.event )
             return res.data.todayEvents.events.event;
         })
         .catch(err => {
           return err
         });*/
       
         // setting variable with the datacolected
         setTodayEvents(TodayEventsInfo.todayEvents.events.event);
     
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
      result: 
                {todayEvents.map((result) =>
                 <div key={result.id}> 
                     {result.title}  {result.start_time}
                     {result.venue_name} {result.venue_address} 
                     {result.city_name} {result.region_name} 
                    
                 </div>
                 )} 
                               
        </div>
    </div>
  );
}

export default App;
