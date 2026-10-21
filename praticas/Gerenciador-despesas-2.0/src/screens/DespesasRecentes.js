import { useMemo } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { useExpenses } from '../store/expenses-context';
import { getColors } from '../constants/theme';
import { getDateMinusDays } from '../util/date';

function DespesasRecentes() {
  const { expenses } = useExpenses();
  const colors = getColors(useColorScheme());

  const recentExpenses = useMemo(() => {
    const limitDate = getDateMinusDays(new Date(), 7);
    return expenses.filter((expense) => expense.date >= limitDate);
  }, [expenses]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <DespesaSaida
        despesas={recentExpenses}
        periodo="Últimos 7 dias"
        textoVazio="Nenhuma despesa nos últimos 7 dias. Toque em + para adicionar."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default DespesasRecentes;