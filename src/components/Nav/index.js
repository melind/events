import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Menu,  Switch } from 'antd';

import './index.css';



const Nav = () => {

    const [theme, setTheme] = useState(null);
    const [location, setLocation] = useState("france");
   // const [location, setLocation] = useState("");
console.log("urlnav",window.location.href)
 let url = window.location.href;
 
 // get the name of the country inside the url
    // localise the place of the name of the country in the url
   async function country() {
    let place = url.match(/\/[a-zA-Z]+\//); 

          if(place && place != null){ 
          // remove the "/" from the url match
          place = place[0].replace(/\//, "");
          let country = place.replace(/\//, "");
          console.log("country",country)
           setLocation(country);
          // update the location          
          }
   
   }
     
     useEffect(() => {
       country();
       }, []);   
    const { SubMenu } = Menu;
   
    const dark = (value: any) => {

               setTheme(value  ? 'dark' : 'light');    
               const menu = document.getElementsByClassName('ant-menu')[0] ;

               const body = document.body;
               body.classList.toggle('dark');
       };

   
    
    return (
        <div className="nav">  
      
                 <Menu mode="horizontal" className="menu" theme={theme}>
                       <SubMenu
                             title={
                        
                                <Switch
                                 onChange={dark}
                                 checkedChildren="Dark"
                                 unCheckedChildren="Light"
                               /> 
                        
                          }
                        >  
                        </SubMenu>

                      <Menu.Item key="home">
                          <Link to="/"> Accueil </Link>
                        </Menu.Item>

                       

                        <Menu.Item key="today">
                         <Link to={`/${location}/aujourdhui`}> Aujourd'hui</Link >
                        </Menu.Item>

                        <Menu.Item key="week">
                         <Link to={`/${location}/semaine`}> La semaine</Link >
                        </Menu.Item>

                          
                 </Menu>
       
         
          
        </div>
    )
}

export default Nav;