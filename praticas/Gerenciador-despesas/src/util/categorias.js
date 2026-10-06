export const categorias = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

export function filtrarPorCategoria(despesas, categoria) {
  if (categoria === 'Todas') {
    return despesas;
  }
  return despesas.filter((despesa) => despesa.categoria === categoria);
}