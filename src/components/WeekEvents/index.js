import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {API} from 'aws-amplify';

const WeekEvents = () => {

    const [weekEvents, setWeekEvents] = useState([]);
    const [location, setLocation] = useState("france");

     async function weekEventsList() { 
         const weekEventsInfo = await API.get('eventapi', `/${location}/week`)
    

         // setting variable with the datacolected
         setWeekEvents(weekEventsInfo.weekEvents.events.event);
     
     }

      useEffect(() => {
       weekEventsList();
       }, []); 

    return (
        <div className="weekEvents">

        <div>
                {weekEvents.map((result) =>
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
export default WeekEvents;