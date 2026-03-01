import { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import {
  saveInformativo,
  updateInformativo,
} from '../services/storage';

export default function NovoInformativoScreen({ navigation, route }) {
  const editIndex = route.params?.index;
  const editItem = route.params?.item;

  const [titulo, setTitulo] = useState(editItem?.titulo || '');
  const [mensagem, setMensagem] = useState(editItem?.mensagem || '');

  async function salvar() {
    if (!titulo || !mensagem) return;

    if (editIndex !== undefined) {
      await updateInformativo(editIndex, {
        titulo,
        mensagem,
        data: new Date().toISOString(),
      });
    } else {
      await saveInformativo({
        titulo,
        mensagem,
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
        placeholder="Mensagem"
        value={mensagem}
        onChangeText={setMensagem}
        multiline
        style={{ borderWidth: 1, marginBottom: 10, padding: 8, height: 120 }}
      />

      <Button
        title={editIndex !== undefined ? 'Salvar Alterações' : 'Publicar Informativo'}
        onPress={salvar}
      />
    </View>
  );
}
