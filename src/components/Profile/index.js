import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Auth, Hub } from 'aws-amplify';
import Form from '../Form';

function Profile() {
  
  useEffect(() => {
    checkUser()
    Hub.listen('auth', (data) => {
      const { payload } = data
      if (payload.event === 'signOut') {
        setUser(null)
      }
    })
  }, [])
  const [user, setUser] = useState(null) 
  async function checkUser() {
    try {
      const data = await Auth.currentUserPoolUser()
      const userInfo = { username: data.username, ...data.attributes }
      setUser(userInfo)
    } catch (err) { console.log('error: ', err) }
  }
  
   if (user) {
  
    return (
     <div className="profile">
        <h1>Profile</h1>
        <p>Email: {user.email}<Link to="/modification-email"> Modifier </Link ></p> 
        <Link to="/modification-mot-de-passe"> Changer de mot de passe </Link >
    </div>
    );

    }
    return <Form setUser={setUser}/>
  
     
}

export default Profile 