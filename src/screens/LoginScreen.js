import { Button, View } from 'react-native';
import { setUserRole } from '../services/storage';

export default function LoginScreen({ navigation, setRole }) {

  async function login(tipo) {
    await setUserRole(tipo);
    setRole(tipo);
    navigation.replace('Home');
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', gap: 20, padding: 20 }}>
      <Button
        title="Entrar como Morador"
        onPress={() => login('morador')}
      />

      <Button
        title="Entrar como Administrador"
        onPress={() => login('admin')}
      />
    </View>
  );
}
