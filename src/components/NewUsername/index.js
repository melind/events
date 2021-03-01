import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import Button from '../Button';
import { styles } from '../Form';



const NewUsername = () => {

  const URL = process.env.REACT_APP_URL;
  const [formState, setFormState] = useState({});
  const [formType, updateFormType] = useState('changeUser')

  async function changeUserName({newEmail}) {

      try {
      
          const user = await Auth.currentAuthenticatedUser()
          if(user) {
            const { attributes } = await Auth.currentAuthenticatedUser();
          
           let result = await Auth.updateUserAttributes(user,{'email': newEmail})
           updateFormType('changeUserConfirm')
         
          }
      } catch (err) {
          console.log('error updating password... :', err)
        }
      
  }


  async function changeUserNameConfirm({confirmationCode}) {
 
       try {

               const user = await Auth.currentAuthenticatedUser()
               if(user) {

                let result = await Auth.verifyCurrentUserAttributeSubmit('email',confirmationCode);


               }
        } catch (err) {
               console.log('error updating password... :', err)
             }
  }

  async function codeResend  () {
      
      try {
      
          const user = await Auth.currentAuthenticatedUser()
          if(user) {
            const { attributes } = await Auth.currentAuthenticatedUser();
          
           let result = await Auth.verifyCurrentUserAttribute('email')
           updateFormType('changeUserConfirm')
         
          }
      } catch (err) {
          console.log('error updating password... :', err)
        }
      
  }
          

  const handleChange = (e) => {
          e.preventDefault();
          const name: string = e.target.name;
          const value: string = e.target.value;
          
          setFormState({...formState, [name]: value});
  
  }

  const handleSubmit = (e) => {
            changeUserName(formState);
  }

  const handleSubmitConfirm = (e) => {
          changeUserNameConfirm(formState);
          window.location.replace(URL||"https://events-world-wide.fr/profile");

  }
   const code = (e) => {
          codeResend();
  }
  
  return (
    <div style={styles.container}>
       {
        formType === 'changeUser' && (
        <>
      <input 
        type='email'
        name='newEmail'
        onChange={handleChange}
        style={styles.input}
        placeholder='votre nouvelle adresse email'
      />
     
      <Button onClick={handleSubmit} title="Valider" /> 
      </>
        )}


         {
        formType === 'changeUserConfirm' && (
        <>
        <input
        name='confirmationCode'
        placeholder='Confirmation code'
        onChange={handleChange}
        style={styles.input}
      />
      <Button onClick={handleSubmitConfirm} title="Valider" />
      <Button onClick={code} title="Renvoyer un code" />
      </>
        )}

    </div>
  )
}

export default NewUsername