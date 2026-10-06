import { getDataMenosDias } from '../util/data';

const hoje = new Date();

export const despesasIniciais = [
  { id: 'd1', descricao: 'Almoço no restaurante', valor: 45.9, data: getDataMenosDias(hoje, 1), categoria: 'Alimentação' },
  { id: 'd2', descricao: 'Recarga do cartão de transporte', valor: 50, data: getDataMenosDias(hoje, 2), categoria: 'Transporte' },
  { id: 'd3', descricao: 'Cinema', valor: 38, data: getDataMenosDias(hoje, 4), categoria: 'Lazer' },
  { id: 'd4', descricao: 'Supermercado', valor: 132.7, data: getDataMenosDias(hoje, 6), categoria: 'Alimentação' },
  { id: 'd5', descricao: 'Conta de luz', valor: 142.35, data: getDataMenosDias(hoje, 12), categoria: 'Contas' },
  { id: 'd6', descricao: 'Aplicativo de corrida', valor: 27.5, data: getDataMenosDias(hoje, 15), categoria: 'Transporte' },
];