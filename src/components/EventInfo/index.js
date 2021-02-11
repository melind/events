import React, { useState, useEffect } from 'react';
import {API} from 'aws-amplify';

const EventInfo = (props) => {
    

    const [events, setEvents] = useState([]);

    let eventName = props.match.params.eventName; 
    let idEvent = props.match.params.idEvent;
    
    async function eventDetails() {  

       const details = await API.get('eventapi', `/${eventName}/${idEvent}`)
      console.log('details ',details)
       setEvents(details.data.eventsInfo);
       
       }
   
       useEffect(() => {
       eventDetails();
       }, []); 

    return (
        <div className="eventInfo">

             <div>
               <p><a href="javascript:history.go(-1)">Retour</a></p>
                 <div > 
                    { events['title'] } {events['start_time']} {events['city']} {events['region']}
                    {events['description']} 
                    
                    {events['links'] && events['links']["link"].map((result) => <div key={result.id}> <a href={`${result.url}`} target="_blank" rel="noreferrer">Billeterie</a></div>)}
                    

                 </div>
                
                               
        </div>
        
        </div>
    )
}
export default EventInfo;