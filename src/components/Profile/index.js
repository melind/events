import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Auth, Hub } from 'aws-amplify'
//import Container from './Container'
import Form from '../Form'

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
     <div>
        <h1>Profile</h1>
        <h3>Email: {user.email}</h3>
    </div>
    );

    }
    return <Form setUser={setUser}/>
  
     
}

export default Profile 