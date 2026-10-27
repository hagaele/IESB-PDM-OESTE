import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expenses';

export const ExpensesContext = createContext(null);

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id
          ? { ...expense, ...action.payload.data }
          : expense
      );
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    case 'SET':
      return action.payload;
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const storedExpenses = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedExpenses !== null) {
          const parsedExpenses = JSON.parse(storedExpenses).map((expense) => ({
            ...expense,
            date: new Date(expense.date),
          }));
          dispatch({ type: 'SET', payload: parsedExpenses });
        }
      } catch {
        Alert.alert('Erro ao carregar', 'Não foi possível carregar as despesas salvas.');
      } finally {
        setIsLoaded(true);
      }
    }

    loadExpenses();
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    async function saveExpenses() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch {
        Alert.alert('Erro ao salvar', 'Não foi possível salvar as despesas.');
      }
    }

    saveExpenses();
  }, [expenses, isLoaded]);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: { ...expenseData, id: Date.now().toString() } });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function clearExpenses() {
    dispatch({ type: 'SET', payload: [] });
  }

  const value = {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    clearExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses deve ser usado dentro de um ExpensesContextProvider.');
  }
  return context;
}