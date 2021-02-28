import React, { useEffect }from 'react';
import './index.css';
const Home = () => {

    return (
        <div className="home">
        <p>Liste des évènements culturels à travers le monde. Année 2021 </p>
        <div className="map"><iframe frameborder="0" src="https://public.opendatasoft.com/map/embed/evenements_a_travers_le_monde/?&static=false&scrollWheelZoom=true"></iframe></div>
        
      
        </div>
    )
}
export default Home;