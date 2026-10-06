import { View, Text, Pressable, StyleSheet } from 'react-native';

function CategoriaSeletor({ opcoes, selecionada, onSelecionar }) {
  return (
    <View style={styles.container}>
      {opcoes.map((opcao) => {
        const ativa = opcao === selecionada;
        return (
          <Pressable
            key={opcao}
            onPress={() => onSelecionar(opcao)}
            android_ripple={{ color: '#cbd5e1' }}
            style={({ pressed }) => [
              styles.opcao,
              ativa && styles.opcaoAtiva,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.texto, ativa && styles.textoAtivo]}>{opcao}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  opcao: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
    marginRight: 8,
    marginBottom: 8,
  },
  opcaoAtiva: {
    backgroundColor: '#2563eb',
  },
  pressed: {
    opacity: 0.6,
  },
  texto: {
    fontSize: 14,
    color: '#374151',
  },
  textoAtivo: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CategoriaSeletor;