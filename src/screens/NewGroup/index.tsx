import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import { ButtonComponent } from '../../components/Button'
import { Header } from '../../components/Header'
import { Highlight } from '../../components/Highlight'
import { InputComponent } from '../../components/Input'
import { groupCreate } from '../../storage/group/groupCreate'
import { AppError } from '../../utils/appError'
import { Container, Content, Icon } from './styles'

export function NewGroup() {
  const [group, setGroup] = useState('');
  
  const navigation = useNavigation();

  async function handleCreateNewGroup(){
    try{
      if(group.trim().length === 0){
        return Alert.alert('Novo Grupo','Informe o nome da turma')
      }else{
        await groupCreate(group)
        navigation.navigate('players',{group})
      }
    }catch(error){ 
      if (error instanceof AppError){
        Alert.alert('Novo Grupo', error.message)
      }else{
        Alert.alert('Novo Grupo', 'Grupo já existe!')
      }
      console.log(error);
    }
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