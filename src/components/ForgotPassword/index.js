import React from 'react'
import Button from '../Button'
import { styles } from '../Form'

function ForgotPassword(props) {
  return (
    <div style={styles.container}>
      <input
        name='email'
        placeholder='email' 
        onChange={e => {e.persist();props.updateFormState(e)}}
        style={styles.input}
      />
      <Button onClick={props.forgotPassword} title="Réinitialiser votre mot de passe" />
    </div>
  )
}

export default ForgotPassword