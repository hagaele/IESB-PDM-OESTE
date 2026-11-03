import { useState } from 'react';
import { Text, Pressable, ScrollView, Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';

const TASKS = [
  { id: '42', title: 'Estudar Expo Router' },
  { id: '7', title: 'Entregar a atividade de PDM' },
  { id: '15', title: 'Revisar para a prova' },
];

export default function TasksScreen() {
  const [place, setPlace] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  async function checkInHandler() {
    setIsLocating(true);

    try {
      const currentPlace = await getCurrentPlace();

      if (currentPlace === null) {
        Alert.alert('Localização negada', 'Ative a permissão de localização para registrar onde você estudou.');
        return;
      }

      setPlace(currentPlace);
    } catch {
      Alert.alert('Erro', 'Não foi possível obter a sua localização agora.');
    } finally {
      setIsLocating(false);
    }
  }

  async function reminderHandler() {
    try {
      const scheduled = await scheduleReminder('Estudar', 10);

      if (scheduled) {
        Alert.alert('Lembrete agendado', 'Você vai receber um aviso em 10 segundos.');
      } else {
        Alert.alert('Notificações negadas', 'Ative as notificações nos ajustes para receber lembretes.');
      }
    } catch {
      Alert.alert('Erro', 'Não foi possível agendar o lembrete.');
    }
  }

  async function completeHandler() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      Alert.alert('Tarefa concluída', 'Este aparelho não tem vibração, mas a tarefa foi concluída.');
      return;
    }

    Alert.alert('Tarefa concluída', 'Bom trabalho!');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.section}>Suas tarefas</Text>
      {TASKS.map((task) => (
        <Pressable
          key={task.id}
          style={({ pressed }) => [styles.taskCard, pressed && styles.pressed]}
          onPress={() => router.push(`/task/${task.id}`)}
        >
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text style={styles.taskId}>Abrir tarefa {task.id}</Text>
        </Pressable>
      ))}

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={() => router.push('/new-task')}
      >
        <Text style={styles.buttonText}>Nova tarefa</Text>
      </Pressable>

      <Text style={styles.section}>Recursos do celular</Text>

      <Pressable
        style={({ pressed }) => [styles.button, (pressed || isLocating) && styles.pressed]}
        onPress={checkInHandler}
        disabled={isLocating}
      >
        <Text style={styles.buttonText}>{isLocating ? 'Buscando local...' : 'Estudei aqui'}</Text>
      </Pressable>
      <Text style={styles.place}>
        {place !== null ? `Você estudou em: ${place.label}` : 'Sem check-in'}
      </Text>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={reminderHandler}
      >
        <Text style={styles.buttonText}>Lembrar em 10 s</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.button, styles.completeButton, pressed && styles.pressed]}
        onPress={completeHandler}
      >
        <Text style={styles.buttonText}>Concluir</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 10,
  },
  taskCard: {
    backgroundColor: '#eef2ff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskId: {
    fontSize: 13,
    color: '#4757b8',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  completeButton: {
    backgroundColor: '#15803d',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  place: {
    marginTop: 10,
    fontSize: 15,
    color: '#374151',
  },
  pressed: {
    opacity: 0.6,
  },
});