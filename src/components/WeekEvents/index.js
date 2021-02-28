import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {API} from 'aws-amplify';
import {  Input, Button } from 'antd';
import './index.css';

const WeekEvents = () => {

    const [weekEvents, setWeekEvents] = useState([]);
    //const [location, setLocation] = useState("france");
    // get the current url
    let url = window.location.href;
    // get the name of the country inside the url
    // localise the place of the name of the country in the url
    
    let place = url.match(/\/[a-zA-Z]+\//);  
    // remove the "/" from the url match
    let country;
    if (place){ 
    place = place[0].replace(/\//, "");
    country = place.replace(/\//, "");
    }
    // update the location          
    const [location, setLocation] = useState(country);
     async function weekEventsList() { 
         const weekEventsInfo = await API.get('eventapi', `/${location}/week`)
    
            console.log(weekEventsInfo)
            
            if (weekEventsInfo.weekEvents.events != null) { 
         // setting variable with the datacolected
         setWeekEvents(weekEventsInfo.weekEvents.events.event);
            }
     }
        let inputValue;
        const handleChange = (e) => {
        const value: string = e.target.value;
        setLocation(value);
                 // name_input : input_value
      }
   
        const handleSubmit = (e) => {
          e.preventDefault();  
             window.location.replace(`/${location}/semaine`);
        }

      useEffect(() => {
       weekEventsList();
       }, []); 

    return (
        <div className="weekEvents">
             <label htmlFor="location"> loacalisation : </label><Input className="input" id="location" name="location"  placeholder="Entrer une localisation" onChange={handleChange} value={inputValue}  ></Input> 
                <Button htmlType="submit" onClick={handleSubmit} >Valider</Button>
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