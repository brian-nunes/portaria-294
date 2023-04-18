import React, { useContext } from 'react';
import '../styles/Help.css';
import { PlataformContext } from '../Context/PlataformContext';
import Steps from '../Enums/Steps';

interface HelpProps {
  previusStep: Steps,
}

const Help: React.FC<HelpProps> = ({previusStep}) => {
    const {setStep} = useContext(PlataformContext);
    
    const handleBack = () => {
      setStep(previusStep);
    }

    if(previusStep === Steps.AskDimensions){
      return (
        <div>
          <span>Ajuda</span>
          <p>Nesta etapa você deve escolher as dimensões do produto que deseja validar as medidas.</p>
          <br/>
          <ul>
            <li>C: Comprimento; Produtos que apenas uma dimensão é considerada. E.g: Linha, barra, cabo.</li>
            <li>CxL: Comprimento e Largura; Produtos que duas dimensões são consideradas. E.g: Toalha, cobertor.</li>
            <li>CxLxA: Comprimento, Largura e Altura; Produtos que três dimensões são consideradas. E.g: Caixa.</li>
          </ul>
          <button className="backButton" onClick={handleBack}>Voltar</button>
        </div>
      );
    } else if (previusStep === Steps.AskNominal){
      return (
        <div>
          <span>Ajuda</span>
          <p>Nesta etapa você deve informar a(s) medidas nominais do produto, isto é, a medida informada para o cliente. Note que a unidade de medida (metro, centímetro, milímetro) não precisa ser especificada, apenas garanta que você está utilizando a mesma unidade em todos os campos de medida, neste, e em todos os outros passos.</p>
          <button className="backButton" onClick={handleBack}>Voltar</button>
        </div>
      );
    } else if (previusStep === Steps.AskAdditionalData){
      return (
        <div>
          <span>Ajuda</span>
          <p>Nesta etapa você deve informar a imprecisão do equipamento de medição utilizado, em instrumentos analógicos como uma régua ou fita métrica a imprecisão é metade da menor unidade de medida marcada no equipamento. Para os exemplos citados, geralmente são os milímetros, portanto temos uma imprecisão de 0.5 milímetros. Já para instrumentos digitais, temos como imprecisão a menor unidade mostrada no equipamento, exemplo: Se uma balança de precisão mostra a medição 1.72g, a menor unidade mostrada é o centésimo de grama (0.01g), caso tenha o manual em mãos é possivel encontrar nele também. Cuidado com a unidade de medida, informe a imprecisão na mesma unidade que informou as medidas nominais.</p>
          <p>Nesta etapa você deve também informar o tamanho do lote do produto avaliado, isto é necessário para saber o tamanho da amostra, portanto, quantidade de medidas por dimensão, que deve ser analisada. Note que estas faixas são definidas pela portaria, não sendo possível altera-las.</p>
          <button className="backButton" onClick={handleBack}>Voltar</button>
        </div>
      );
    } else{
      return (
        <div>
          <span>Ajuda</span>
          <p>Nesta etapa você deve informar as medições obtidas na amostra separadas por virgulas (utilize ponto para informar decimais). Você pode fazer isto tanto através de um arquivo .csv, ou digitando diretamente na caixa de texto. A estrutura do arquivo ou do texto puro são as mesmas, as medidas são separadas por virgula, e cada dimensão fica em uma linha.</p>
          <hr/>
          <p>Exemplos:</p>
          <hr/>
          <p>Linha (Apenas comprimento importa) com um lote de 10 unidades:</p>
          <p>4.98,5,5.01,5.02,4.99</p>
          <p>Temos as 5 medidas de comprimento necessárias definidas em uma linha</p>
          <hr/>
          <p>Toalha (Comprimento e largura importam) com um lote de 10 unidades:</p>
          <p>4.98,5,5.01,5.02,4.99</p>
          <p>3,2.99,3.02,2.97,3</p>
          <p>Temos as 5 medidas de comprimento definidas na primeira linha, e as 5 medidas de largura na segunda, totalizando 10 medidas necessárias.</p>
          <hr/>
          <p>Caixa (Comprimento, largura e altura importam) com um lote de 10 unidades:</p>
          <p>4.98,5,5.01,5.02,4.99</p>
          <p>3,2.99,3.02,2.97,3</p>
          <p>0.99,1,1.01,1.02,0.97</p>
          <hr/>
          <p>Temos as 5 medidas de comprimento definidas na primeira linha, e as 5 medidas de largura na segunda, e as 5 de altura definidas na terceira linha as totalizando 15 medidasm necessárias.</p>
          <p>Note que por consideramos lotes de 10 unidades apenas 5 medidas por dimensão foram necessárias, mas mais medidas são necessárias conforme maior o lote, esta relação é definida na portaria.</p>
          <p>Antes de finalizar você deve validar os dados. Caso a caixa de texto fique com o contorno verde, está tudo certo e podemos finalizar, caso contrário devemos ajustar algo nos dados.</p>
          <button className="backButton" onClick={handleBack}>Voltar</button>
        </div>
      );
    }
};

export default Help;
