import { View, Text, StyleSheet } from 'react-native';

function TodasDespesas() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Tela Todas as Despesas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontSize: 18,
  },
});

export default TodasDespesas;