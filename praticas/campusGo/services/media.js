import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking } from 'react-native';

const imageOptions = { mediaTypes: ['images'], quality: 0.7 };

export async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync(imageOptions);
  return result.canceled ? null : result.assets[0].uri;
}

export async function takePhoto() {
  const { granted } = await ImagePicker.requestCameraPermissionsAsync();

  if (!granted) {
    Alert.alert('Câmera bloqueada', 'Permita o acesso à câmera nos ajustes para tirar uma foto.', [
      { text: 'Agora não', style: 'cancel' },
      { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
    ]);
    return null;
  }

  const shot = await ImagePicker.launchCameraAsync(imageOptions);
  return shot.canceled ? null : shot.assets[0].uri;
}
