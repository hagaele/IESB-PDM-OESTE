import { FlatList, View, Text, StyleSheet, useWindowDimensions, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DespesaItem from './DespesaItem';
import { getColors } from '../../constants/theme';

function DespesaLista({ despesas, header, textoVazio }) {
  const { width } = useWindowDimensions();
  const colors = getColors(useColorScheme());
  const numColumns = width > 600 ? 2 : 1;

  return (
    <FlatList
      key={numColumns}
      data={despesas}
      numColumns={numColumns}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={numColumns > 1 ? styles.halfColumn : styles.fullColumn}>
          <DespesaItem item={item} />
        </View>
      )}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Ionicons name="receipt-outline" size={56} color={colors.textMuted} />
          <Text style={[styles.emptyText, { color: colors.textMuted }]}>{textoVazio}</Text>
        </View>
      }
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  fullColumn: {
    width: '100%',
  },
  halfColumn: {
    width: '50%',
    paddingHorizontal: 4,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default DespesaLista;