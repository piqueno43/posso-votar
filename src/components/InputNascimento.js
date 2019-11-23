import React from 'react'
import InputMask from 'react-text-mask'
const InputNascimento = props => {
  const mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  return <InputMask mask={mask} guide {...props} />
}

export default InputNascimento
