import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import CategoriaSeletor from '../components/despesa/CategoriaSeletor';
import { categorias, filtrarPorCategoria } from '../util/categorias';
import { getDataMenosDias } from '../util/data';

function DespesasRecentes({ despesas }) {
  const [filtro, setFiltro] = useState('Todas');

  const seteDiasAtras = getDataMenosDias(new Date(), 7);
  const despesasRecentes = despesas.filter((despesa) => despesa.data >= seteDiasAtras);
  const despesasFiltradas = filtrarPorCategoria(despesasRecentes, filtro);
  const periodo = filtro === 'Todas' ? 'Últimos 7 dias' : `Últimos 7 dias (${filtro})`;

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
        textoVazio="Nenhuma despesa nos últimos 7 dias."
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

export default DespesasRecentes;