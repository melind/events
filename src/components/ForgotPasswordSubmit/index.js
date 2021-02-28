import React from 'react'
import Button from '../Button'
import { styles } from '../Form'

function ForgotPasswordSubmit(props) {
  return (
    <div style={styles.container}>
      <input
        name='confirmationCode'
        placeholder='Confirmation code'
        onChange={e => {e.persist();props.updateFormState(e)}}
        style={styles.input}
      />
      <input 
        name='username'
        onChange={e => {e.persist();props.updateFormState(e)}}
        style={styles.input}
        placeholder='email'
      />
      <input
        name='password'
        placeholder='Nouveau mot de passe'
        type='password'
        onChange={e => {e.persist();props.updateFormState(e)}}
        style={styles.input}
      />

      <Button onClick={props.forgotPasswordSubmit} title="Save new password" />
    </div>
  )
}

export default ForgotPasswordSubmit