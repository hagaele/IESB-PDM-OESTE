import { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, Share, Alert, StyleSheet } from 'react-native';
import { useExpenses } from '../../store/expenses-context';

export default function WalletScreen() {
  const { expenses, addExpense } = useExpenses();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  async function shareHandler() {
    try {
      await Share.share({ message: `Gastei R$ ${total.toFixed(2)} neste semestre.` });
    } catch {
      Alert.alert('Erro', 'Não foi possível abrir o menu de compartilhar.');
    }
  }

  function amountChangeHandler(text) {
    const normalizedText = text.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(normalizedText)) {
      setAmount(normalizedText);
    }
  }

  function addHandler() {
    const value = parseFloat(amount);

    if (description.trim().length < 3 || isNaN(value) || value <= 0) {
      Alert.alert('Dados inválidos', 'Informe uma descrição com 3 letras ou mais e um valor maior que zero.');
      return;
    }

    addExpense({
      description: description.trim(),
      amount: value,
      date: new Date(),
      category: 'Outros',
    });
    setDescription('');
    setAmount('');
  }

  const header = (
    <View>
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total gasto</Text>
        <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.shareButton, pressed && styles.pressed]}
        onPress={shareHandler}
      >
        <Text style={styles.shareText}>Compartilhar resumo</Text>
      </Pressable>

      <Text style={styles.section}>Nova despesa</Text>
      <View style={styles.form}>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={[styles.input, styles.amountInput]}
          placeholder="0.00"
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={amountChangeHandler}
        />
      </View>
      <Pressable
        style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
        onPress={addHandler}
      >
        <Text style={styles.addText}>Adicionar</Text>
      </Pressable>

      <Text style={styles.section}>Despesas</Text>
    </View>
  );

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={expenses}
      keyExtractor={(item) => item.id}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={header}
      ListEmptyComponent={<Text style={styles.empty}>Nenhuma despesa cadastrada ainda.</Text>}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text style={styles.rowText}>{item.description}</Text>
          <Text style={styles.rowAmount}>R$ {item.amount.toFixed(2)}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  totalCard: {
    backgroundColor: '#dde0f5',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: '#2a3380',
  },
  totalValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2a3380',
    marginTop: 4,
  },
  shareButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  shareText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  section: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  form: {
    flexDirection: 'row',
  },
  input: {
    borderWidth: 1,
    borderColor: '#c5c8e6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  descriptionInput: {
    flex: 1,
    marginRight: 8,
  },
  amountInput: {
    width: 100,
  },
  addButton: {
    borderWidth: 1,
    borderColor: '#2563eb',
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addText: {
    color: '#2563eb',
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#c5c8e6',
  },
  rowText: {
    fontSize: 15,
    flex: 1,
    marginRight: 12,
  },
  rowAmount: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 8,
  },
  pressed: {
    opacity: 0.6,
  },
});
