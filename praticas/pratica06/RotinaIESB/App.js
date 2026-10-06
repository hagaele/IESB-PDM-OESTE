import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';
import {
  tituloApp,
  placeholderCompromisso,
  botaoAdicionar,
  tituloLista,
  listaVazia,
} from './labels';

const STORAGE_KEY = '@rotina_iesb_compromissos';

const labels = {
  placeholderCompromisso,
  botaoAdicionar,
};

export default function App() {
  const [inputText, setInputText] = useState('');
  const [compromissos, setCompromissos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarCompromissos() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
        if (dadosSalvos !== null) {
          setCompromissos(JSON.parse(dadosSalvos));
        }
      } catch (erro) {
        Alert.alert(
          'Erro ao carregar',
          'Não foi possível carregar seus compromissos salvos.'
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarCompromissos();
  }, []);

  useEffect(() => {
    if (carregando) return;

    async function salvarCompromissos() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (erro) {
        Alert.alert(
          'Erro ao salvar',
          'Não foi possível salvar seus compromissos. Tente novamente.'
        );
      }
    }

    salvarCompromissos();
  }, [compromissos, carregando]);

  function adicionarCompromissoHandler() {
    const textoLimpo = inputText.trim();

    if (textoLimpo.length === 0) {
      Alert.alert('Campo vazio', 'Digite um compromisso antes de adicionar.');
      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadoEm: new Date().toISOString(),
      concluido: false,
    };

    setCompromissos((atuais) => [...atuais, novoCompromisso]);
    setInputText('');
  }

  function deletarCompromissoHandler(id) {
    setCompromissos((atuais) => atuais.filter((item) => item.id !== id));
  }

  function alternarConcluidoHandler(id) {
    setCompromissos((atuais) =>
      atuais.map((item) =>
        item.id === id ? { ...item, concluido: !item.concluido } : item
      )
    );
  }

  const pendentes = compromissos.filter((item) => !item.concluido).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Image
            source={require('./assets/logo.png')}
            style={styles.headerImage}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.headerTitle}>{tituloApp}</Text>
            <Text style={styles.headerCounter}>{pendentes} pendentes</Text>
          </View>
        </View>

        <View style={styles.mainContainer}>
          <CompromissoInput
            value={inputText}
            onChangeText={setInputText}
            onAdd={adicionarCompromissoHandler}
            labels={labels}
          />

          <CompromissoList
            itens={compromissos}
            onDelete={deletarCompromissoHandler}
            onToggle={alternarConcluidoHandler}
            tituloLista={tituloLista}
            listaVazia={listaVazia}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  headerImage: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerCounter: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});