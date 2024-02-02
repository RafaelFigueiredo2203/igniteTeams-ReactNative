import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ButtonComponent } from '../../components/Button'
import { Header } from '../../components/Header'
import { Highlight } from '../../components/Highlight'
import { InputComponent } from '../../components/Input'
import { Container, Content, Icon } from './styles'

export function NewGroup() {
  const [group, setGroup] = useState('');
  
  const navigation = useNavigation();

  function handleCreateNewGroup(){
    navigation.navigate('players',{group})
  }

  return (
    <Container>
      <Header showBackButton/>

      <Content>
        <Icon/>
        <Highlight
        title='Nova Turma'
        subtitle='Crie a turma para adicionar pessoas'
        />

        
        <InputComponent
        onChangeText={setGroup}
        placeholder="Nome da Turma"
        />
        <ButtonComponent 
        onPress={handleCreateNewGroup}
        title='Criar' style={{marginTop:20}}/>

      </Content>
    </Container>
  )
}