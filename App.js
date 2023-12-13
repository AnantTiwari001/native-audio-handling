import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Audio from './Components/Audio';
import Example from './Components/Example';

export default function App() {
  return (
    <View style={styles.container}>
      <Audio/>
      {/* <Example/> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
