import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Button } from 'react-native';



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

  useEffect(() => {
    getUserRole().finally(() => setLoading(false));
    
  }, []);

  if (loading) return null;
  const [role, setRole] = useState(null);


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={({ navigation }) => ({
          headerRight: () => (
            <Button
              title="Sair"
              color="pink"
              onPress={async () => {
                await clearUserRole();
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                });
              }}
            />
          ),
        })}
      >
        {/* LOGIN — sem botão sair */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerRight: () => null }}
        />

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Informativos" component={InformativosScreen} />
        <Stack.Screen name="Ocorrencias" component={OcorrenciasScreen} />
        <Stack.Screen name="NovaOcorrencia" component={NovaOcorrenciaScreen} />
        <Stack.Screen name="NovoInformativo" component={NovoInformativoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
