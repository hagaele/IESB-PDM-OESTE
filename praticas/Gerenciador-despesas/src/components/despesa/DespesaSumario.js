import { View, Text, StyleSheet } from 'react-native';

function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce(
    (acumulador, item) => acumulador + item.valor,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={[styles.soma, somaDespesas > 200 && styles.somaAlta]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#dbeafe',
    borderRadius: 8,
  },
  periodo: {
    fontSize: 14,
    color: '#1e3a8a',
  },
  soma: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  somaAlta: {
    color: '#dc2626',
  },
});

export default DespesaSumario;