import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import InformativosScreen from './src/screens/InformativosScreen';
import LoginScreen from './src/screens/LoginScreen';
import NovaOcorrenciaScreen from './src/screens/NovaOcorrenciaScreen';
import NovoInformativoScreen from './src/screens/NovoInformativoScreen';
import OcorrenciasScreen from './src/screens/OcorrenciasScreen';

import { clearUserRole, getUserRole } from './src/services/storage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function carregar() {
      const r = await getUserRole();
      setRole(r);
      setLoading(false);
    }
    carregar();
  }, []);

  if (loading) {
    return null; // OK — hooks já foram declarados antes
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={role ? 'Home' : 'Login'}
        screenOptions={({ navigation }) => ({
          headerTitle: () => (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                Conecta Bairro
              </Text>
              {role && (
                <Text style={{ fontSize: 12 }}>
                  Logado como: {role === 'admin' ? 'Administrador' : 'Morador'}
                </Text>
              )}
            </View>
          ),
          headerRight: () =>
            role ? (
              <Button
                title="Sair"
                onPress={async () => {
                  await clearUserRole();
                  setRole(null);
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  });
                }}
              />
            ) : null,
        })}
      >
        <Stack.Screen name="Login">
  {props => <LoginScreen {...props} setRole={setRole} />}
</Stack.Screen>


        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Informativos" component={InformativosScreen} />
        <Stack.Screen name="Ocorrencias" component={OcorrenciasScreen} />
        <Stack.Screen name="NovaOcorrencia" component={NovaOcorrenciaScreen} />
        <Stack.Screen name="NovoInformativo" component={NovoInformativoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
