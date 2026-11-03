import { View, Text, FlatList, ActivityIndicator, Pressable, Alert, StyleSheet } from 'react-native';
import { FadeIn } from '../../components/FadeIn';
import { useNotices } from '../../hooks/useNotices';
import { api } from '../../services/api';

export default function HomeScreen() {
  const { notices, isLoading, error, reload } = useNotices();

  async function createNoticeHandler() {
    try {
      const created = await api.create('posts', {
        title: 'Aviso criado no CampusGo',
        body: 'Este aviso foi enviado pelo aplicativo.',
        userId: 1,
      });
      Alert.alert('Aviso criado', `O servidor devolveu o id ${created.id}.`);
    } catch (requestError) {
      Alert.alert('Erro', requestError.message);
    }
  }

  if (isLoading && notices.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.message}>Carregando avisos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Não foi possível carregar</Text>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={reload}
        >
          <Text style={styles.buttonText}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.createButton, pressed && styles.pressed]}
        onPress={createNoticeHandler}
      >
        <Text style={styles.createButtonText}>Criar aviso</Text>
      </Pressable>

      <FlatList
        data={notices}
        keyExtractor={(item) => String(item.id)}
        refreshing={isLoading}
        onRefresh={reload}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum aviso por enquanto.</Text>}
        renderItem={({ item, index }) => (
          <FadeIn delay={index * 70}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardBody} numberOfLines={2}>{item.body}</Text>
            </View>
          </FadeIn>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  message: {
    marginTop: 12,
    fontSize: 15,
    color: '#6b7280',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  errorText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#b91c1c',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  createButton: {
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  createButtonText: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#eef2ff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  cardBody: {
    fontSize: 14,
    color: '#374151',
  },
  empty: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 32,
    fontSize: 15,
  },
  pressed: {
    opacity: 0.6,
  },
});
