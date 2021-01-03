import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
//import { Provider } from "react-redux";
import './index.css' 
import App from './components/App';

import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

import reportWebVitals from './reportWebVitals';

const ComponentToRender = () => (
 
        <Router>
            <App />
        </Router>

    
);
ReactDOM.render(<ComponentToRender />, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
