import React, { useContext, useEffect, useState } from 'react';
import './styles/App.css';
import DimensionsBox from './Components/DimensionsBox';
import {PlataformContext} from './Context/PlataformContext';
import Steps from './Enums/Steps';
import NominalBox from './Components/NominalBox';
import AdditionalData from './Components/AdditionalData';
import Measures from './Components/Measures';
import Loading from './Components/Loading';
import Results from './Components/Results';
import Help from './Components/Help';
import DataBox from './Components/DataBox';

const App: React.FC = () => {
  const { step } = useContext(PlataformContext)
  const [actualStep, setActualStep] = useState(step);

  useEffect(() => {
    if(step !== Steps.Help) {
      setActualStep(step);
    }
  }, [step]);

  return (
    <div className="mainContainer">
        {step !== Steps.Help && <h1>Plataforma Alpha - Portaria nº 294</h1>}
        {step !== Steps.Help && <DataBox/>}
        <div className="centralContainer">
          {step === Steps.AskDimensions && <DimensionsBox/>}
          {step === Steps.AskNominal && <NominalBox/>}
          {step === Steps.AskAdditionalData && <AdditionalData/>}
          {step === Steps.AskMeasures && <Measures/>}
          {step === Steps.Calculation && <Loading/>}
          {step === Steps.ShowResults && <Results/>}
          {step === Steps.Help && <Help previusStep={actualStep} />}
        </div>
    </div>
  );
}

export default App;

