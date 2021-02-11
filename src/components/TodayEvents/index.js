import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {API} from 'aws-amplify';
import { Input, Button } from 'antd';

const TodayEvents = () => {
    
    const [todayEvents, setTodayEvents] = useState([]);
    // get the current url
    let url = window.location.href;
    // get the name of the country inside the url
    // localise the place of the name of the country in the url
    let place = url.match(/\/[a-zA-Z]+\//);  
    // remove the "/" from the url match
    let country;
    if(place){ 
    place = place[0].replace(/\//, "");
     country = place.replace(/\//, "");
    }
    // update the location          
    const [location, setLocation] = useState(country);

   
     async function TodayEventsList() {  
         
         const TodayEventsInfo = await API.get('eventapi', `/${location}/today`)
         console.log(TodayEventsInfo)
         // setting variable with the datacolected
         
        if (TodayEventsInfo.todayEvents.events != null) { 
         // setting variable with the datacolected
            setTodayEvents(TodayEventsInfo.todayEvents.events.event);
            }
     }
      let inputValue;
      const handleChange = (e) => {
        
        const value: string = e.target.value;
        inputValue = value;
        console.log('input',inputValue);
        setLocation(value);
                 // name_input : input_value
            
     }
   
        const handleSubmit = (e) => {
          //e.preventDefault();  
            //TodayEventsList();
           window.location.replace(`/${location}/aujourdhui`);
        }

      useEffect(() => {
       TodayEventsList();
       }, []); 

    return (
        <div className="todayEvent">
             <label htmlFor="location"> loacalisation : </label><Input className="input" id="location" name="location"  placeholder="Entrer une localisation" onChange={handleChange} value={inputValue}  ></Input> 
                <Button htmlType="submit" onClick={handleSubmit} >Valider</Button>
               
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