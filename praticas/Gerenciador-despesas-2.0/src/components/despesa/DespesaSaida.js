import DespesaLista from './DespesaLista';
import DespesaSumario from './DespesaSumario';

function DespesaSaida({ despesas, periodo, textoVazio }) {
  return (
    <DespesaLista
      despesas={despesas}
      header={<DespesaSumario despesas={despesas} periodo={periodo} />}
      textoVazio={textoVazio}
    />
  );
}

export default DespesaSaida;