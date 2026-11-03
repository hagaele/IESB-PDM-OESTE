import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function NewTaskScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta tela abre como modal. Toque em Fechar para voltar às tarefas.</Text>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Fechar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.6,
  },
});
