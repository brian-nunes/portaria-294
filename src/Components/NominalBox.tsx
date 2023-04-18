import React, { useContext, useState } from 'react';
import '../styles/NominalBox.css';
import Dimensions from '../Enums/Dimensions';
import { PlataformContext } from '../Context/PlataformContext';
import Steps from '../Enums/Steps';
import HelpButton from './HelpButton';

const NominalBox: React.FC = () => {
  const { dimension, setStep, setMeasuresNominal, measuresNominal } = useContext(PlataformContext);
  const [isValid, setIsValid] = useState(true);

const handleValidation = (inputs: NodeListOf<Element>) => {
  let valid = true;
  inputs.forEach((input) => {
    if ((input as HTMLInputElement).value === "") {
      valid = false;
      input.classList.add('invalid');
    } else {
      input.classList.remove('invalid');
    }
  });
  setIsValid(valid);
  return valid;
};

  const handleGetMeasures = (inputs: NodeListOf<Element>) => {
    const measureList: number[] = [];
    inputs.forEach(input => {
        measureList.push(+(input as HTMLInputElement).value)
    });
    return measureList;
  }

  const handleNext = () => {
    const inputs = document.querySelectorAll('.nominalBox__input');
    if (handleValidation(inputs)) {
      console.log("New step: AskAdditionalData");
      setMeasuresNominal(handleGetMeasures(inputs));
      setStep(Steps.AskAdditionalData);
    }
  }

  const handlePrevius = () => {
    setStep(Steps.AskDimensions);
    console.log("New step: AskDimensions");
  }

  return (
    <div className="nominalBox">
      <h1 className='nominalBox__h1'>Digite os valores nominais das medidas:</h1>
      <div className="nominalBox__inputs">
        <input type="number" className="nominalBox__input" placeholder="Comprimento" defaultValue={measuresNominal[0]||""}/>
        {dimension !== Dimensions.C && (
          <input type="number" className="nominalBox__input" placeholder="Largura" defaultValue={measuresNominal[1]||""}/>
        )}
        {dimension === Dimensions.CLA && (
          <input type="number" className="nominalBox__input" placeholder="Altura" defaultValue={measuresNominal[1]||""}/>
        )}
      </div>
      {!isValid && (
        <p className="msg_erro">Por favor, preencha todos os campos.</p>
      )}
      <p className="nominalBox__note">Obs.: Não se preocupe com a unidade de medida, apenas garanta que está usando a mesma para todos os dados informados!</p>
      <div className="navButtons">
        <button className="nominalBox__button nominalBox__button--prev" onClick={handlePrevius}>Anterior</button>
        <HelpButton/>
        <button className="nominalBox__button nominalBox__button--next" onClick={handleNext}>Próximo</button>
      </div>
    </div>
  );
}

export default NominalBox;
