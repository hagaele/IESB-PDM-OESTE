import { useMemo, useState } from 'react';
import { View, TextInput, Alert, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DespesaSaida from '../components/despesa/DespesaSaida';
import CategoriaSeletor from '../components/despesa/CategoriaSeletor';
import IconButton from '../components/IconButton';
import { useExpenses } from '../store/expenses-context';
import { useDebounce } from '../hooks/useDebounce';
import { CATEGORIES } from '../constants/categories';
import { getColors } from '../constants/theme';

const ALL_CATEGORIES = 'Todas';

function TodasDespesas() {
  const { expenses, clearExpenses } = useExpenses();
  const colors = getColors(useColorScheme());

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(ALL_CATEGORIES);
  const debouncedSearch = useDebounce(search, 400);

  const filteredExpenses = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    return expenses.filter((expense) => {
      const matchesSearch = expense.description.toLowerCase().includes(term);
      const matchesCategory =
        categoryFilter === ALL_CATEGORIES || expense.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [expenses, debouncedSearch, categoryFilter]);

  function clearAllHandler() {
    Alert.alert('Limpar tudo', 'Todas as despesas serão apagadas. Deseja continuar?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Limpar', style: 'destructive', onPress: clearExpenses },
    ]);
  }

  const emptyText =
    expenses.length === 0
      ? 'Nenhuma despesa. Toque em + para adicionar.'
      : 'Nenhuma despesa encontrada para essa busca.';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.searchRow}>
        <View
          style={[
            styles.searchBox,
            { backgroundColor: colors.inputBackground, borderColor: colors.border },
          ]}
        >
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Buscar por descrição"
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
            autoCorrect={false}
          />
        </View>
        {expenses.length > 0 && (
          <IconButton
            icon="trash-outline"
            size={22}
            color={colors.error}
            onPress={clearAllHandler}
          />
        )}
      </View>

      <CategoriaSeletor
        options={[ALL_CATEGORIES, ...CATEGORIES]}
        selected={categoryFilter}
        onSelect={setCategoryFilter}
      />

      <DespesaSaida despesas={filteredExpenses} periodo="Total" textoVazio={emptyText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 15,
  },
});

export default TodasDespesas;