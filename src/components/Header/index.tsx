import React from 'react'
import logoIMg from '../../assets/logo.png'
import { Container, Logo } from './styles'

export  function Header() {
  return (
    <Container>
      <Logo source={logoIMg} />
    </Container>
  )
}