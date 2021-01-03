import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {API} from 'aws-amplify';

const TodayEvents = () => {
    
    const [todayEvents, setTodayEvents] = useState([]);
    const [location, setLocation] = useState("france");
     async function TodayEventsList() {  
         
         const TodayEventsInfo = await API.get('eventapi', `/${location}/today`)
       console.log(TodayEventsInfo)
         // setting variable with the datacolected
         setTodayEvents(TodayEventsInfo.todayEvents.events.event);
     
     }
      useEffect(() => {
       TodayEventsList();
       }, []); 

    return (
        <div className="todayEvent">
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
    )
}
export default TodayEvents;