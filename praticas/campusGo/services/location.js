import * as Location from 'expo-location';

async function describePlace(latitude, longitude) {
  const fallback = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

  try {
    const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });

    if (!address) {
      return fallback;
    }

    const parts = [address.street ?? address.name, address.district, address.city, address.region].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : fallback;
  } catch {
    return fallback;
  }
}

export async function getCurrentPlace() {
  const permission = await Location.requestForegroundPermissionsAsync();

  if (permission.status !== 'granted') {
    return null;
  }

  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });
  const { latitude, longitude } = position.coords;

  return {
    latitude,
    longitude,
    label: await describePlace(latitude, longitude),
  };
}
