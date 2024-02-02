import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Players } from '../components/Players';
import { Groups } from '../screens/Groups';
import { NewGroup } from '../screens/NewGroup';

const {Navigator , Screen} = createNativeStackNavigator();

export function AppRoutes(){
  return(
    <Navigator initialRouteName='groups' screenOptions={{headerShown:false}}>
      <Screen
      name='groups'
      component={Groups}
      />
      <Screen
      name='players'
      component={Players}
      />
      <Screen
      name='new'
      component={NewGroup}
      />
    </Navigator>
  );
}