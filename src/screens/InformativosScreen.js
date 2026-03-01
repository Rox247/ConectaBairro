import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import Card from '../components/Card';
import {
  deleteInformativo,
  getInformativos,
  getUserRole,
} from '../services/storage';

export default function InformativosScreen({ navigation }) {
  const [informativos, setInformativos] = useState([]);
  const [role, setRole] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getInformativos().then(setInformativos);
      getUserRole().then(setRole);
    }, [])
  );

  function formatarData(dataISO) {
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR') + ' ' +
      data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  async function excluir(index) {
    await deleteInformativo(index);
    const atualizados = await getInformativos();
    setInformativos(atualizados);
  }

  function confirmarExcluir(index) {
    if (window.confirm('Deseja excluir este informativo?')) {
      excluir(index);
    }
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f2f2f2' }}>
      {role === 'admin' && (
        <Button
          title="Novo Informativo"
          onPress={() => navigation.navigate('NovoInformativo')}
        />
      )}

      <FlatList
        data={informativos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Card>
            <Text style={{ fontWeight: 'bold' }}>{item.titulo}</Text>
            <Text>{item.mensagem}</Text>
            <Text style={{ fontSize: 12, color: '#666', marginTop: 5 }}>
              Publicado em {formatarData(item.data)}
            </Text>

            {role === 'admin' && (
              <>
                <Button
                  title="Editar"
                  onPress={() =>
                    navigation.navigate('NovoInformativo', { index, item })
                  }
                />
                <Button
                  title="Excluir"
                  color="red"
                  onPress={() => confirmarExcluir(index)}
                />
              </>
            )}
          </Card>
        )}
      />
    </View>
  );
}
