
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';
import { Loading } from './src/components/Loading';
import { Groups } from './src/screens/Groups';
import theme from './src/themes/theme';

export default function App() {
   const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});



  return (
    <ThemeProvider theme={theme}>
    {fontsLoaded ? <Groups/> : <Loading/>}
    <StatusBar style='light'/>
    </ThemeProvider>

  );
}
