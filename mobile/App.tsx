 // StatusBar serve para manipular a aparencia dos icones que aparecem na barra superior no celular, a status bar.
import { StatusBar } from 'react-native';
import {useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold} from '@expo-google-fonts/inter' //importação da fonts para uso. É necessário instalar expo-fonts com: npx expo install expo-font @expo-google-fonts/nomeDaFonte 
import {Loading} from './src/components/loading'
import { Home } from './src/screens/Home';

//criação e exportação do componente utilizando React Native. Componentes sempre começam com letra maiúscula. View e Text são as tagas para o mobile, funcionam como  as tags para web, por exemplo o View e como se fosse uma div, o Text como um p.
export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular, 
    Inter_600SemiBold, 
    Inter_700Bold, 
    Inter_800ExtraBold
  }); //chamada das fonts importadas para poder usar

  if(!fontsLoaded){
    return (
      <Loading />
    );
  } // para caso as fonts não renderizem, parar a aplicação
  
  return (
    <>
      <Home/>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </>
  );
}


