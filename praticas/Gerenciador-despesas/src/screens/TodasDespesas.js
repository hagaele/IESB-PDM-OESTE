import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import CategoriaSeletor from '../components/despesa/CategoriaSeletor';
import { categorias, filtrarPorCategoria } from '../util/categorias';

function TodasDespesas({ despesas }) {
  const [filtro, setFiltro] = useState('Todas');

  const despesasFiltradas = filtrarPorCategoria(despesas, filtro);
  const periodo = filtro === 'Todas' ? 'Total' : `Total (${filtro})`;

  return (
    <View style={styles.container}>
      <CategoriaSeletor
        opcoes={['Todas', ...categorias]}
        selecionada={filtro}
        onSelecionar={setFiltro}
      />
      <DespesaSaida
        despesas={despesasFiltradas}
        periodo={periodo}
        textoVazio="Nenhuma despesa encontrada."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default TodasDespesas;