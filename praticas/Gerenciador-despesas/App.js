import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import DespesasRecentes from './src/screens/DespesasRecentes';
import TodasDespesas from './src/screens/TodasDespesas';
import GerenciarDespesa from './src/screens/GerenciarDespesa';
import IconButton from './src/components/IconButton';
import { despesasIniciais } from './src/data/despesasIniciais';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabScreen({ despesas }) {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate('GerenciarDespesa')}
          />
        ),
        tabBarLabelStyle: { fontSize: 12 },
      })}
    >
      <Tab.Screen
        name="DespesasRecentes"
        options={{
          title: 'Despesas Recentes',
          tabBarLabel: 'Recentes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      >
        {() => <DespesasRecentes despesas={despesas} />}
      </Tab.Screen>
      <Tab.Screen
        name="TodasDespesas"
        options={{
          title: 'Todas as Despesas',
          tabBarLabel: 'Todas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
        }}
      >
        {() => <TodasDespesas despesas={despesas} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [despesas, setDespesas] = useState(despesasIniciais);

  function adicionarDespesa(novaDespesa) {
    setDespesas((atuais) => [novaDespesa, ...atuais]);
  }

  function atualizarDespesa(despesaAtualizada) {
    setDespesas((atuais) =>
      atuais.map((despesa) =>
        despesa.id === despesaAtualizada.id ? despesaAtualizada : despesa
      )
    );
  }

  function excluirDespesa(id) {
    setDespesas((atuais) => atuais.filter((despesa) => despesa.id !== id));
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Despesas" options={{ headerShown: false }}>
            {() => <BottomTabScreen despesas={despesas} />}
          </Stack.Screen>
          <Stack.Screen name="GerenciarDespesa">
            {({ navigation, route }) => (
              <GerenciarDespesa
                navigation={navigation}
                route={route}
                despesas={despesas}
                onAdicionar={adicionarDespesa}
                onAtualizar={atualizarDespesa}
                onExcluir={excluirDespesa}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}