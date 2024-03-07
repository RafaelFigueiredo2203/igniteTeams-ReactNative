import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "../sorage_config";
import { PlayerStorageDTO } from "./PlayerStorageDTO";


export async function playersGetByGroup(group:string){
  try{
    const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`)

    const players: PlayerStorageDTO[] =  storage ? JSON.parse(storage) : [];
    
    return players;
  }catch(error){
    throw error;;
  }
}