import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';

function CompromissoList({ itens, onDelete, onToggle, tituloLista, listaVazia }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{tituloLista}</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>{listaVazia}</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Pressable
              style={styles.textArea}
              android_ripple={{ color: '#e2e8f0' }}
              onPress={() => onToggle(item.id)}
            >
              <Text
                style={[
                  styles.itemText,
                  item.concluido && styles.itemTextConcluido,
                ]}
              >
                {item.texto}
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.deleteButton,
                pressed && styles.deleteButtonPressed,
              ]}
              android_ripple={{ color: '#fecaca' }}
              onPress={() => onDelete(item.id)}
            >
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  textArea: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  itemText: {
    fontSize: 16,
  },
  itemTextConcluido: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  deleteButtonPressed: {
    backgroundColor: '#fecaca',
  },
  deleteButtonText: {
    color: '#b91c1c',
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default CompromissoList;