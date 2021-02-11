import React from 'react'
import Button from '../Button'
import { styles } from '../Form'

function SignIn({ signIn, updateFormState }) {
  return (
    <div style={styles.container}>
      <input 
        name='email'
        onChange={e => {e.persist();updateFormState(e)}}
        style={styles.input}
        placeholder='email'
      />
      <input
        type='password'
        name='password'
        onChange={e => {e.persist();updateFormState(e)}}
        style={styles.input}
        placeholder='password'
      />
      <Button onClick={signIn} title="Sign In" />
    </div>
  )
}

export default SignIn