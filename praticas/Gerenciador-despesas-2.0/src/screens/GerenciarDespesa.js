import { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import CategoriaModal from '../components/despesa/CategoriaModal';
import { useExpenses } from '../store/expenses-context';
import { CATEGORIES } from '../constants/categories';
import { getColors } from '../constants/theme';
import { getFormattedDate } from '../util/date';

function validate(values) {
  const errors = {};

  if (values.description.trim().length < 3) {
    errors.description = 'Mínimo de 3 caracteres';
  }

  const amount = parseFloat(values.amount);
  if (isNaN(amount) || amount <= 0) {
    errors.amount = 'Informe um valor maior que zero';
  }

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  if (values.date > endOfToday) {
    errors.date = 'A data não pode ser futura';
  }

  if (!values.category) {
    errors.category = 'Escolha uma categoria';
  }

  return errors;
}

function GerenciarDespesa({ navigation, route }) {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const colors = getColors(useColorScheme());

  const expenseId = route.params?.expenseId;
  const isEditing = Boolean(expenseId);
  const selectedExpense = expenses.find((expense) => expense.id === expenseId);

  const [form, setForm] = useState({
    description: selectedExpense ? selectedExpense.description : '',
    amount: selectedExpense ? selectedExpense.amount.toFixed(2) : '',
    date: selectedExpense ? selectedExpense.date : new Date(),
    category: selectedExpense ? selectedExpense.category : '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const errors = submitted ? validate(form) : {};

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
    });
  }, [navigation, isEditing]);

  function handleChange(field, value) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  }

  function amountChangeHandler(text) {
    const normalizedText = text.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(normalizedText)) {
      handleChange('amount', normalizedText);
    }
  }

  function dateChangeHandler(event, selectedDate) {
    setShowPicker(Platform.OS === 'ios');
    if (event.type === 'set' && selectedDate) {
      handleChange('date', selectedDate);
    }
  }

  function categorySelectHandler(category) {
    handleChange('category', category);
    setModalVisible(false);
  }

  function saveHandler() {
    setSubmitted(true);
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const expenseData = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category,
    };

    if (isEditing) {
      updateExpense(expenseId, expenseData);
    } else {
      addExpense(expenseData);
    }
    navigation.goBack();
  }

  function deleteHandler() {
    Alert.alert('Excluir despesa', 'Esta ação não pode ser desfeita.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  }

  function fieldStyle(field) {
    return [
      styles.input,
      {
        backgroundColor: colors.inputBackground,
        borderColor: errors[field] ? colors.error : colors.border,
        borderWidth: errors[field] ? 2 : 1,
        color: colors.text,
      },
    ];
  }

  function renderError(field) {
    if (!errors[field]) {
      return null;
    }
    return <Text style={[styles.errorText, { color: colors.error }]}>{errors[field]}</Text>;
  }

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={[styles.label, { color: colors.text }]}>Descrição</Text>
        <TextInput
          style={fieldStyle('description')}
          placeholder="Ex: Almoço"
          placeholderTextColor={colors.textMuted}
          value={form.description}
          onChangeText={(text) => handleChange('description', text)}
        />
        {renderError('description')}

        <Text style={[styles.label, { color: colors.text }]}>Valor (R$)</Text>
        <TextInput
          style={fieldStyle('amount')}
          placeholder="0.00"
          placeholderTextColor={colors.textMuted}
          keyboardType="decimal-pad"
          value={form.amount}
          onChangeText={amountChangeHandler}
        />
        {renderError('amount')}

        <Text style={[styles.label, { color: colors.text }]}>Data</Text>
        <Pressable style={[fieldStyle('date'), styles.selectField]} onPress={() => setShowPicker(true)}>
          <Text style={[styles.selectText, { color: colors.text }]}>{getFormattedDate(form.date)}</Text>
          <Ionicons name="calendar-outline" size={20} color={colors.textMuted} />
        </Pressable>
        {showPicker && (
          <DateTimePicker value={form.date} mode="date" onChange={dateChangeHandler} />
        )}
        {renderError('date')}

        <Text style={[styles.label, { color: colors.text }]}>Categoria</Text>
        <Pressable
          style={[fieldStyle('category'), styles.selectField]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={[styles.selectText, { color: form.category ? colors.text : colors.textMuted }]}>
            {form.category || 'Escolha a categoria'}
          </Text>
          <Ionicons name="chevron-down" size={20} color={colors.textMuted} />
        </Pressable>
        {renderError('category')}

        <View style={styles.buttons}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.cancelButton,
              { borderColor: colors.border },
              pressed && styles.pressed,
            ]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.buttonText, { color: colors.text }]}>Cancelar</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.saveButton,
              { backgroundColor: colors.primary },
              pressed && styles.pressed,
            ]}
            onPress={saveHandler}
          >
            <Text style={[styles.buttonText, { color: colors.onPrimary }]}>Salvar</Text>
          </Pressable>
        </View>

        {isEditing && (
          <Pressable
            style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}
            onPress={deleteHandler}
          >
            <Ionicons name="trash-outline" size={20} color={colors.error} />
            <Text style={[styles.deleteText, { color: colors.error }]}>Excluir</Text>
          </Pressable>
        )}
      </ScrollView>

      <CategoriaModal
        visible={modalVisible}
        categories={CATEGORIES}
        selected={form.category}
        onSelect={categorySelectHandler}
        onClose={() => setModalVisible(false)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  selectField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 13,
    marginTop: 4,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 28,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    marginRight: 8,
  },
  saveButton: {
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 12,
  },
  deleteText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.6,
  },
});

export default GerenciarDespesa;