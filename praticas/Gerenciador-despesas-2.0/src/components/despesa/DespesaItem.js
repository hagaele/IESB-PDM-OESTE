import { View, Text, Pressable, StyleSheet, Platform, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getColors } from '../../constants/theme';
import { getFormattedDate } from '../../util/date';

function DespesaItem({ item }) {
  const navigation = useNavigation();
  const colors = getColors(useColorScheme());

  function handlePress() {
    navigation.navigate('GerenciarDespesa', { expenseId: item.id });
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.info}>
          <Text style={[styles.description, { color: colors.text }]}>{item.description}</Text>
          <Text style={[styles.date, { color: colors.textMuted }]}>{getFormattedDate(item.date)}</Text>
          <View style={[styles.tag, { backgroundColor: colors.tagBackground }]}>
            <Text style={[styles.tagText, { color: colors.tagText }]}>{item.category}</Text>
          </View>
        </View>
        <View style={[styles.amountBox, { backgroundColor: colors.primary }]}>
          <Text style={[styles.amount, { color: colors.onPrimary }]}>
            R$ {item.amount.toFixed(2)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
      default: {
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
      },
    }),
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    marginBottom: 6,
  },
  tag: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  tagText: {
    fontSize: 12,
  },
  amountBox: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    minWidth: 90,
    alignItems: 'center',
  },
  amount: {
    fontWeight: 'bold',
  },
});

export default DespesaItem;