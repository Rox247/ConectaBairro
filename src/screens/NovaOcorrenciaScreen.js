import { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import {
  saveOcorrencia,
  updateOcorrencia,
} from '../services/storage';

export default function NovaOcorrenciaScreen({ navigation, route }) {
  const editIndex = route.params?.index;
  const editItem = route.params?.item;

  const [titulo, setTitulo] = useState(editItem?.titulo || '');
  const [descricao, setDescricao] = useState(editItem?.descricao || '');

  async function salvar() {
    if (!titulo || !descricao) return;

    if (editIndex !== undefined) {
      await updateOcorrencia(editIndex, {
        titulo,
        descricao,
        data: new Date().toISOString(),
      });
    } else {
      await saveOcorrencia({
        titulo,
        descricao,
        data: new Date().toISOString(),
      });
    }

    navigation.goBack();
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        style={{ borderWidth: 1, marginBottom: 10, padding: 8, height: 100 }}
      />

      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}
