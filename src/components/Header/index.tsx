
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import logoIMg from '../../assets/logo.png';
import { BackButton, BackIcon, Container, Logo } from './styles';

type Props = {
  showBackButton?:boolean;
}

export  function Header({showBackButton = false}: Props) {
  const navigation = useNavigation();

  function handleGoBack(){
    navigation.navigate('groups');
  }
  return (
    <Container>
     {
      showBackButton &&
      <BackButton onPress={handleGoBack}>
      <BackIcon/>
      </BackButton>
    }

      <Logo source={logoIMg} />
    </Container>
  )
}