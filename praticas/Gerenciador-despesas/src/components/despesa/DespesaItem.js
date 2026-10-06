import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDataFormatada } from '../../util/data';

function DespesaItem({ id, descricao, valor, data, categoria }) {
  const navigation = useNavigation();

  function despesaPressHandler() {
    navigation.navigate('GerenciarDespesa', { despesaId: id });
  }

  return (
    <Pressable
      onPress={despesaPressHandler}
      android_ripple={{ color: '#cbd5e1' }}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.item}>
        <View style={styles.info}>
          <Text style={styles.descricao}>{descricao}</Text>
          <Text style={styles.data}>{getDataFormatada(data)}</Text>
          <View style={styles.tag}>
            <Text style={styles.tagTexto}>{categoria}</Text>
          </View>
        </View>
        <View style={styles.valorContainer}>
          <Text style={styles.valor}>R$ {valor.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#1e3a8a',
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  descricao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  data: {
    fontSize: 13,
    color: '#dbeafe',
    marginBottom: 6,
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  tagTexto: {
    fontSize: 12,
    color: '#374151',
  },
  valorContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    minWidth: 90,
    alignItems: 'center',
  },
  valor: {
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
});

export default DespesaItem;