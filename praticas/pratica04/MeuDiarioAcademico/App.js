import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, Switch } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

// Importação dos rótulos (import/export - Requisito A)
import {
  appTitle,
  inputPlaceholder,
  addButtonLabel,
  listTitle,
  switchLabel,
} from './labels';

// Lista estática por enquanto (o foco da atividade é layout e componentes,
// não persistência de dados).
const disciplinas = [
  'Programação para Dispositivos Móveis',
  'Banco de Dados II',
  'Engenharia de Software',
  'Redes de Computadores',
];

export default function App() {
  // SafeAreaProvider precisa envolver a árvore de componentes para que
  // o SafeAreaView calcule corretamente as áreas seguras (notch, barra
  // de status, etc.). Sem ele, o app pode falhar ao renderizar.
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  // Estado local apenas para demonstrar o Pressable "pressionado"
  // e o Switch (desafio opcional - ainda sem filtro real).
  const [pressed, setPressed] = useState(false);
  const [somenteObrigatorias, setSomenteObrigatorias] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <Text style={styles.header}>{appTitle}</Text>

      {/* Linha de cadastro: TextInput (~70%) + Botão (~30%)
          Usamos flexDirection: 'row' para colocar os dois lado a lado,
          e flex numérico em vez de largura fixa em pixels, para que o
          layout se adapte a diferentes tamanhos de tela. */}
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder={inputPlaceholder}
        />
        <Pressable
          style={[styles.button, pressed && styles.buttonPressed]}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
        >
          <Text style={styles.buttonText}>{addButtonLabel}</Text>
        </Pressable>
      </View>

      {/* Switch (desafio opcional) - ainda sem filtro real aplicado à lista */}
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>{switchLabel}</Text>
        <Switch
          value={somenteObrigatorias}
          onValueChange={setSomenteObrigatorias}
        />
      </View>

      {/* Lista de disciplinas */}
      <Text style={styles.listTitle}>{listTitle}</Text>
      <View style={styles.list}>
        {disciplinas.map((disciplina, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemText}>{disciplina}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // ocupa toda a tela disponível
    padding: 20,
    backgroundColor: '#fff',
  },

  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  // Linha de cadastro (row): alinhamos os itens no centro verticalmente
  // (alignItems: 'center') para que o input e o botão fiquem nivelados,
  // mesmo tendo alturas ligeiramente diferentes.
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  // ~70% da linha via flex, em vez de width fixo, para se adaptar
  // a diferentes larguras de tela.
  input: {
    flex: 0.7,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
  },

  // ~30% da linha, demonstrando também o uso de largura percentual (%),
  // conforme exigido no requisito D.
  button: {
    width: '28%',
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',   // centraliza o texto horizontalmente
    justifyContent: 'center', // centraliza o texto verticalmente
  },

  buttonPressed: {
    backgroundColor: '#1e40af', // feedback visual ao pressionar
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // afasta o texto do switch nas pontas
    marginBottom: 20,
  },

  switchLabel: {
    fontSize: 14,
  },

  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },

  list: {
    flex: 1, // ocupa o espaço restante da tela
  },

  item: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    margin: 6,
    borderRadius: 8,
  },

  itemText: {
    fontSize: 16,
  },
});