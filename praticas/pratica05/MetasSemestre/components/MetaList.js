import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';

function MetaList({ metas, onDelete, onToggle }) {
  if (metas.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhuma meta cadastrada ainda.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(meta) => meta.id}
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
                item.concluida && styles.itemTextConcluida,
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
  );
}

const styles = StyleSheet.create({
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
  itemTextConcluida: {
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 14,
  },
});

export default MetaList;