import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import Card from '../components/Card';
import {
  deleteOcorrencia,
  getOcorrencias,
  getUserRole,
} from '../services/storage';

export default function OcorrenciasScreen({ navigation }) {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [role, setRole] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getOcorrencias().then(setOcorrencias);
      getUserRole().then(setRole);
    }, [])
  );

  function formatarData(dataISO) {
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR') + ' ' +
      data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  async function excluir(index) {
    await deleteOcorrencia(index);
    const atualizadas = await getOcorrencias();
    setOcorrencias(atualizadas);
  }

  function confirmarExcluir(index) {
    if (window.confirm('Deseja excluir esta ocorrência?')) {
      excluir(index);
    }
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f2f2f2' }}>
      {role === 'admin' && (
        <Button
          title="Nova Ocorrência"
          onPress={() => navigation.navigate('NovaOcorrencia')}
        />
      )}

      <FlatList
        data={ocorrencias}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Card>
            <Text style={{ fontWeight: 'bold' }}>{item.titulo}</Text>
            <Text>{item.descricao}</Text>
            <Text style={{ fontSize: 12, color: '#666', marginTop: 5 }}>
              Registrado em {formatarData(item.data)}
            </Text>

            {role === 'admin' && (
              <>
                <Button
                  title="Editar"
                  onPress={() =>
                    navigation.navigate('NovaOcorrencia', { index, item })
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
