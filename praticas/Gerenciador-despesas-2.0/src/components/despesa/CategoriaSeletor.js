import { View, Text, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { getColors } from '../../constants/theme';

function CategoriaSeletor({ options, selected, onSelect }) {
  const colors = getColors(useColorScheme());

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isActive = option === selected;
        return (
          <Pressable
            key={option}
            onPress={() => onSelect(option)}
            style={({ pressed }) => [
              styles.chip,
              { backgroundColor: isActive ? colors.primary : colors.tagBackground },
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.chipText, { color: isActive ? colors.onPrimary : colors.tagText }]}>
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 14,
  },
  pressed: {
    opacity: 0.6,
  },
});

export default CategoriaSeletor;