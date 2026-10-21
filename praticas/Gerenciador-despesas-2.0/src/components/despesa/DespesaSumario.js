import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { getColors } from '../../constants/theme';

function DespesaSumario({ despesas, periodo }) {
  const colors = getColors(useColorScheme());

  const total = despesas.reduce((soma, despesa) => soma + despesa.amount, 0);
  const quantidade = despesas.length === 1 ? '1 despesa' : `${despesas.length} despesas`;

  return (
    <View style={[styles.container, { backgroundColor: colors.summaryBackground }]}>
      <View>
        <Text style={[styles.period, { color: colors.summaryText }]}>{periodo}</Text>
        <Text style={[styles.quantity, { color: colors.summaryText }]}>{quantidade}</Text>
      </View>
      <Text style={[styles.total, { color: total > 200 ? colors.error : colors.summaryText }]}>
        R$ {total.toFixed(2)}
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
    borderRadius: 8,
  },
  period: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 13,
    marginTop: 2,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DespesaSumario;