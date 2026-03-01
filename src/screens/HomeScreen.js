import { Button, View } from 'react-native';
import { clearUserRole } from '../services/storage';

export default function HomeScreen({ navigation }) {
  async function logout() {
    await clearUserRole();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Button title="Informativos" onPress={() => navigation.navigate('Informativos')} />
      <Button title="Ocorrências" onPress={() => navigation.navigate('Ocorrencias')} />
      
    </View>
  );
}
