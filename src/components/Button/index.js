import React from 'react'

export default function Button({ onClick, title }) {
  return (
    <button style={styles.button} onClick={onClick}>
      {title}
    </button>
  )
}

const styles = {
  button: {
    
   
    background: 'linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),linear-gradient(127deg, rgba(252,203,8,.8), rgba(0,255,0,0) 70.71%),linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)' ,
    color: 'white',
    width: 316,
    height: 45,
    fontWeight: '600',
    fontSize: 14,
    cursor: 'pointer',
    border:'none',
    outline: 'none',
    borderRadius: 3,
    marginTop: '25px',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, .3)',
  },
}