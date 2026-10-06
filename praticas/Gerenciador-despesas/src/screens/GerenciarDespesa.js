import { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CategoriaSeletor from '../components/despesa/CategoriaSeletor';
import { categorias } from '../util/categorias';
import { getDataFormatada } from '../util/data';

function GerenciarDespesa({ navigation, route, despesas, onAdicionar, onAtualizar, onExcluir }) {
  const despesaId = route.params?.despesaId;
  const editando = Boolean(despesaId);
  const despesaEditada = despesas.find((despesa) => despesa.id === despesaId);

  const [descricao, setDescricao] = useState(despesaEditada ? despesaEditada.descricao : '');
  const [valor, setValor] = useState(despesaEditada ? despesaEditada.valor.toFixed(2) : '');
  const [data, setData] = useState(despesaEditada ? despesaEditada.data : new Date());
  const [categoria, setCategoria] = useState(despesaEditada ? despesaEditada.categoria : '');
  const [mostrarPicker, setMostrarPicker] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: editando ? 'Editar Despesa' : 'Nova Despesa',
    });
  }, [navigation, editando]);

  function valorHandler(texto) {
    const textoNormalizado = texto.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(textoNormalizado)) {
      setValor(textoNormalizado);
    }
  }

  function dataHandler(evento, dataSelecionada) {
    setMostrarPicker(Platform.OS === 'ios');
    if (evento.type === 'set' && dataSelecionada) {
      setData(dataSelecionada);
    }
  }

  function salvarHandler() {
    const valorNumerico = parseFloat(valor);

    if (
      descricao.trim().length === 0 ||
      isNaN(valorNumerico) ||
      valorNumerico <= 0 ||
      categoria === ''
    ) {
      Alert.alert(
        'Dados inválidos',
        'Preencha a descrição, o valor e a categoria antes de salvar.'
      );
      return;
    }

    const dados = {
      descricao: descricao.trim(),
      valor: valorNumerico,
      data,
      categoria,
    };

    if (editando) {
      onAtualizar({ id: despesaId, ...dados });
    } else {
      onAdicionar({ id: Date.now().toString(), ...dados });
    }
    navigation.goBack();
  }

  function excluirHandler() {
    onExcluir(despesaId);
    navigation.goBack();
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Almoço"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        keyboardType="decimal-pad"
        value={valor}
        onChangeText={valorHandler}
      />

      <Text style={styles.label}>Data</Text>
      <Pressable style={styles.input} onPress={() => setMostrarPicker(true)}>
        <Text style={styles.dataTexto}>{getDataFormatada(data)}</Text>
      </Pressable>
      {mostrarPicker && (
        <DateTimePicker
          value={data}
          mode="date"
          maximumDate={new Date()}
          onChange={dataHandler}
        />
      )}

      <Text style={styles.label}>Categoria</Text>
      <CategoriaSeletor
        opcoes={categorias}
        selecionada={categoria}
        onSelecionar={setCategoria}
      />

      <View style={styles.botoes}>
        <Pressable
          style={({ pressed }) => [styles.botao, styles.botaoCancelar, pressed && styles.pressed]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.botao, styles.botaoSalvar, pressed && styles.pressed]}
          onPress={salvarHandler}
        >
          <Text style={styles.botaoSalvarTexto}>{editando ? 'Atualizar' : 'Adicionar'}</Text>
        </Pressable>
      </View>

      {editando && (
        <Pressable
          style={({ pressed }) => [styles.botaoExcluir, pressed && styles.pressed]}
          onPress={excluirHandler}
        >
          <Text style={styles.botaoExcluirTexto}>Excluir despesa</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 12,
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  dataTexto: {
    fontSize: 16,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  botao: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoCancelar: {
    backgroundColor: '#e5e7eb',
    marginRight: 8,
  },
  botaoSalvar: {
    backgroundColor: '#2563eb',
    marginLeft: 8,
  },
  botaoCancelarTexto: {
    color: '#374151',
    fontWeight: 'bold',
  },
  botaoSalvarTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  botaoExcluir: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#fee2e2',
  },
  botaoExcluirTexto: {
    color: '#b91c1c',
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.6,
  },
});

export default GerenciarDespesa;