import { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { pickImage, takePhoto } from '../../services/media';

const PHOTO_KEY = '@profile-photo';

export default function ProfileScreen() {
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    async function loadPhoto() {
      try {
        const savedUri = await AsyncStorage.getItem(PHOTO_KEY);
        if (savedUri !== null) {
          setPhotoUri(savedUri);
        }
      } catch {
        Alert.alert('Erro ao carregar', 'Não foi possível carregar a foto salva.');
      }
    }

    loadPhoto();
  }, []);

  async function changePhoto(getImage) {
    try {
      const uri = await getImage();
      if (uri === null) {
        return;
      }

      setPhotoUri(uri);
      await AsyncStorage.setItem(PHOTO_KEY, uri);
    } catch {
      Alert.alert('Erro', 'Não foi possível trocar a foto agora.');
    }
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => changePhoto(pickImage)}
        style={({ pressed }) => pressed && styles.pressed}
      >
        {photoUri !== null ? (
          <Image source={{ uri: photoUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Ionicons name="person" size={64} color="#9ca3af" />
          </View>
        )}
      </Pressable>
      <Text style={styles.hint}>Toque na foto para escolher da galeria</Text>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={() => changePhoto(pickImage)}
        >
          <Ionicons name="images" size={20} color="#ffffff" />
          <Text style={styles.buttonText}>Galeria</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={() => changePhoto(takePhoto)}
        >
          <Ionicons name="camera" size={20} color="#ffffff" />
          <Text style={styles.buttonText}>Câmera</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  placeholder: {
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    marginTop: 12,
    fontSize: 14,
    color: '#6b7280',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 28,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  pressed: {
    opacity: 0.6,
  },
});
