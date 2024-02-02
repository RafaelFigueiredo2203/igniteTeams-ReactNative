import { useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { ButtonComponent } from '../Button'
import { ButtonIcon } from '../ButtonIcon'
import { Filter } from '../Filter'
import { Header } from '../Header'
import { Highlight } from '../Highlight'
import { InputComponent } from '../Input'
import { ListEmpty } from '../ListEmpty'
import { PlayerCard } from '../PlayerCard'
import { Container, Form, HeaderList, NumbersOfPlayers } from './styles'


type RouteParams = {
  group:string;
}

export function Players() {
  
  const [team, setTeam] = useState('Tima A');
  const [players, setPlayers] = useState(['Rafael', 'Vini']);
  const route = useRoute();
  const {group} = route.params as RouteParams;
  

  return (
    <Container>
      <Header showBackButton/>

      <Highlight
      title={group}
      subtitle='adicione a galera e separe os times'
      />

      <Form>
      <InputComponent
      placeholder="Nome da pessoa"
      autoCorrect={false}
      />

      <ButtonIcon icon='add'/>
      </Form>

      <HeaderList>
      <FlatList
        data={['Time A', 'Time B']}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Filter
          isFilterActive={item === team}
          title={item}
          onPress={() => setTeam(item)}
          />
        )}
        horizontal
      />
      <NumbersOfPlayers>
        {players.length}
      </NumbersOfPlayers>
    </HeaderList>

    <FlatList
    data={players}
    keyExtractor={item => item}
    renderItem={({item}) => (
      <PlayerCard name={item} onRemove={() => {}}/>
    )}

    ListEmptyComponent={() =>(
      <ListEmpty message='Não há pessoas nesse time !'/>
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        {paddingBottom:100},
        players.length === 0 && {flex:1}
      ]}
    />

    <ButtonComponent title='Remover turma' type="SECONDARY"/>
    </Container>
  )
}