import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import Button from '../Button';
import { styles } from '../Form';



const NewPaswword = () => {
  
  const URL = process.env.REACT_APP_URL;
  const [formState, setFormState] = useState({});

  async function changePassword({ oldPassword, newPassword}) {
     
      try {
      
          const user = await Auth.currentAuthenticatedUser()
          if(user) { 
          const { attributes } = await Auth.currentAuthenticatedUser();
          //console.log('user',user,attributes)
          Auth.changePassword(user, oldPassword, newPassword)
          .then()
          .catch(function (err){ 
            console.log('error updating password... :', err)
            if(err.message && err.message === 'Incorrect username or password.') {
            alert('Mot de passe invalide.')
           }
           if(err.message && err.message === 'Password did not conform with policy: Password not long enough') {
             alert('Mot de passe pas assez long.')
           }
           if(err.code && err.code === 'InvalidParameterException') {
             alert('Mot de passe pas pas conforme.')
           }
           if(err.code && err.code === 'LimitExceededException') {
             alert('Trop de tentatives. Réessayer plus tard.')
           }
           if(err.message && err.message === 'Password did not conform with policy: Password must have uppercase characters') {
             alert('Le mot de passe doit contenir une majuscule')
           }
           if(err.message && err.message === 'Password did not conform with policy: Password must have numeric characters') {
             alert('Le mot de passe doit contenir un chiffre')
           }
            }
            )
          
          }
        } catch (err) {
           
          console.log('error updating password... :', err)
        }
      
  }
  const handleChange = (e) => {
          
          const name: string = e.target.name;
          const value: string = e.target.value;
          
          setFormState({...formState, [name]: value});
              
       }
    const handleSubmit = (e) => {
            changePassword(formState);
            
          }
  return (
    <div style={styles.container}>
      <input 
        type='password'
        name='oldPassword'
        onChange={handleChange}
        style={styles.input}
        placeholder='ancien mot de passe'
      />
      <input
        type='password'
        name='newPassword'
        onChange={handleChange}
        style={styles.input}
        placeholder='nouveau mot de passe'
      />
      <p>Mot de passe doit contenir : minuscule, majuscule, chiffre</p>
      <Button onClick={handleSubmit} title="Valider" />
    </div>
  )
}

export default NewPaswword