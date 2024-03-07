import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "../../utils/appError";
import { GROUP_COLLECTION } from "../sorage_config";
import { getAllGroups } from "./getAllGroups";

export async function groupCreate(newGroupName: string){
  try{
    const storagedGroups = await getAllGroups();

    const groupAlreadyExists = storagedGroups.includes(newGroupName)

    if(groupAlreadyExists){
      throw new AppError('Este grupo ja existe')
    }

    const storage = JSON.stringify([...storagedGroups, newGroupName])

    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  }catch(error){
    throw error;
  }
}