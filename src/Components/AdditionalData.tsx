import React, { useContext, useState } from 'react';
import { PlataformContext } from '../Context/PlataformContext';
import Steps from '../Enums/Steps';
import '../styles/AdditionalData.css';

const AdditionalData: React.FC = () => {
  const { setStep, setFaixaLote, setImprecision, faixaLote, imprecision } = useContext(PlataformContext);
  const [selectedOption, setSelectedOption] = useState<string>(faixaLote ?? '');
  const [nextClicked, setNextClicked] = useState(false);
  const [precisionValue, setPrecisionValue] = useState(imprecision.toString());

  const options = process.env.REACT_APP_FAIXAS_LOTES?.split(',') ?? [];

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleNext = () => {
    setNextClicked(true);

    if (precisionValue === '') {
      return;
    }

    setImprecision(Number(precisionValue));

    if (selectedOption !== '') {
      setFaixaLote(selectedOption);
      setStep(Steps.AskMeasures);
      console.log('New step: AskMeasures');
    }
  };

  const handlePrevius = () => {
    setStep(Steps.AskNominal);
    console.log('New step: AskNominal');
  };

  const handlePrecisionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrecisionValue(event.target.value);
  };

  return (
    <div className="additionalData">
      <h1 className="additionalData__h1">Forneça os dados adicionais:</h1>
      <div className="additionalData__imprecisionBox">
        <label>Imprecisão do instrumento:</label>
        <input
          type="number"
          className={(nextClicked && precisionValue === '') ? 'invalid additionalData__input' : 'additionalData__input'}
          placeholder="Imprecisão"
          defaultValue={(imprecision === 0) ? "" : imprecision}
          onChange={handlePrecisionChange}
        />
      </div>
      {nextClicked && precisionValue === '' && <p className='msg_erro'>Por favor, informe uma imprecisão.</p>}
      <label>Qual a faixa de produtos no lote:</label>
      <div className="additionalData__options">
        {options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              name="precision"
              value={option}
              checked={option === selectedOption}
              onChange={handleOptionChange}
            />
            <div className="additionalData__radio">{option}</div>
          </label>
        ))}
        {nextClicked && selectedOption === '' && <p>Por favor, selecione uma opção.</p>}
      </div>
      <div className="navButtons">
        <button className="nominalBox__button nominalBox__button--prev" onClick={handlePrevius}>Anterior</button>
        <button className="nominalBox__button nominalBox__button--next" onClick={handleNext}>Próximo</button>
      </div>
    </div>
  );
};

export default AdditionalData;
