 // StatusBar serve para manipular a aparencia dos icones que aparecem na barra superior no celular, a status bar.
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold} from '@expo-google-fonts/inter' //importação da fonts para uso. É necessário instalar expo-fonts com: npx expo install expo-font @expo-google-fonts/nomeDaFonte 
import {Loading} from './src/components/loading'

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
    <View style={styles.container}>
      <Text style= {styles.text}>Open up App.tsx to start working on your app!</Text>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </View>
  );
}

// StyleSheet é a maneira de utilizar o css pelo mobile. Por padrão flexbox já é ativo.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090A', // no React Native não se separa as propriedades com palavras separadas, se usa camelCase.
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'Inter_800ExtraBold',
  }
});
