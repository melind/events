import React from 'react';
import { Link} from 'react-router-dom';
import { Auth } from 'aws-amplify'

const SignOut = (user) => {


  function signOut() {
    Auth.signOut()
      .catch(err => console.log('error signing out: ', err))
      window.location.replace("http://localhost:3000/");
  }
 


    return (
        <div>
                <div>{user.username}</div>
                <div> <Link to="/profile"> Mon compte</Link > </div>
                <a href="/" onClick={signOut}>déconnectez-vous</a>

        </div>
        
    )
    
}
  


export default SignOut;