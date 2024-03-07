import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'
import { groupRemoveByName } from '../../storage/group/groupRemoveByName'
import { PlayerStorageDTO } from '../../storage/player/PlayerStorageDTO'
import { playerAddByGroup } from '../../storage/player/playerAddByGroup'
import { playerGetByGroupAndTeam } from '../../storage/player/playerGetByGroupAndTeam'
import { playerRemoveByGroup } from '../../storage/player/playerRemoveByGroup'
import { AppError } from '../../utils/appError'
import { ButtonComponent } from '../Button'
import { ButtonIcon } from '../ButtonIcon'
import { Filter } from '../Filter'
import { Header } from '../Header'
import { Highlight } from '../Highlight'
import { InputComponent } from '../Input'
import { ListEmpty } from '../ListEmpty'
import { Loading } from '../Loading'
import { PlayerCard } from '../PlayerCard'
import { Container, Form, HeaderList, NumbersOfPlayers } from './styles'


type RouteParams = {
  group:string;
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation();
  const [playerName, setPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const route = useRoute();
  const {group} = route.params as RouteParams;
  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer(){
    if(playerName.trim().length === 0){
      return Alert.alert('Nova Pessoa', 'Informe o nome do Player!');
    }

    const newPlayer = {
      name:playerName,
      team,
    }
    try{
      await playerAddByGroup(newPlayer, group);
      newPlayerNameInputRef.current?.blur();
      setPlayerName('')
      fetchPlayersByTeam();
      
    }catch(error ){
      if(error instanceof AppError){
        Alert.alert('Nova Pessoa', error.message);
      }else{
        console.log(error);
        Alert.alert('Nova Pessoa', ' Não foi possível adicionar!')
      }
    }
  }

  async function fetchPlayersByTeam(){
    try{
      setIsLoading(true);
      const playersByTeam = await playerGetByGroupAndTeam(group , team);

      setPlayers(playersByTeam);
     
    }catch(error){
      console.log(error);
      Alert.alert('Pessoas','Não foi possível carregar as pessoas do time!');
    }finally{
      setIsLoading(false);
    }
  }

  async function handleRemovePlayer(playerName:string){
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert('Remover pessoa', 'Não foi possível remover')
    }
  }
  async function groupRemove(){
      try {
        await groupRemoveByName(group);
        navigation.navigate('groups');
      } catch (error) {
        console.log(error);
        Alert.alert('Remover Grupo', 'Não Foi possível remover')
      }
  }

  async function handleGroupRemove() {
    Alert.alert('Remover Grupo', 'Deseja Remover o grupo?',
    [
      {text:'Não', style:'cancel'},
      {text:'Sim', onPress:() => groupRemove()}
    ]
    );
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton/>

      <Highlight
      title={group}
      subtitle='adicione a galera e separe os times'
      />

      <Form>
      <InputComponent
      inputRef={newPlayerNameInputRef}
      value={playerName}
      onChangeText={setPlayerName}
      placeholder="Nome da pessoa"
      autoCorrect={false}
      onSubmitEditing={handleAddPlayer}
      returnKeyType='done'
      />

      <ButtonIcon onPress={handleAddPlayer} icon='add'/>
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
    {
      isLoading ? <Loading/> :
    
    <FlatList
    data={players}
    keyExtractor={item => item.name}
    renderItem={({item}) => (
      <PlayerCard name={item.name} onRemove={() => handleRemovePlayer(item.name)}/>
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
    }
    
    <ButtonComponent title='Remover turma' 
    type="SECONDARY" onPress={handleGroupRemove}/>
    </Container>
  )
}