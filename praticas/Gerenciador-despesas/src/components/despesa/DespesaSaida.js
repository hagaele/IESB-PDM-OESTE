import { View, Text, StyleSheet } from 'react-native';
import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';

function DespesaSaida({ despesas, periodo, textoVazio }) {
  return (
    <View style={styles.container}>
      <DespesaSumario despesas={despesas} periodo={periodo} />
      {despesas.length > 0 ? (
        <DespesaLista despesas={despesas} />
      ) : (
        <Text style={styles.vazio}>{textoVazio}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  vazio: {
    marginTop: 32,
    textAlign: 'center',
    fontSize: 15,
    color: '#6b7280',
  },
});

export default DespesaSaida;