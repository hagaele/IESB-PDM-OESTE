import { Modal, View, Text, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getColors } from '../../constants/theme';

function CategoriaModal({ visible, categories, selected, onSelect, onClose }) {
  const colors = getColors(useColorScheme());

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.wrapper}>
        <Pressable
          style={[StyleSheet.absoluteFill, { backgroundColor: colors.overlay }]}
          onPress={onClose}
        />
        <View style={[styles.sheet, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.text }]}>Escolha a categoria</Text>
          {categories.map((category) => (
            <Pressable
              key={category}
              onPress={() => onSelect(category)}
              style={({ pressed }) => [
                styles.option,
                { borderBottomColor: colors.border },
                pressed && styles.pressed,
              ]}
            >
              <Text style={[styles.optionText, { color: colors.text }]}>{category}</Text>
              {category === selected && (
                <Ionicons name="checkmark" size={20} color={colors.primary} />
              )}
            </Pressable>
          ))}
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [styles.cancel, pressed && styles.pressed]}
          >
            <Text style={[styles.cancelText, { color: colors.primary }]}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    padding: 20,
    paddingBottom: 32,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 16,
  },
  cancel: {
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 10,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.6,
  },
});

export default CategoriaModal;