import React, { useContext } from 'react';
import './styles/App.css';
import DimensionsBox from './Components/DimensionsBox';
import {PlataformContext} from './Context/PlataformContext';
import Steps from './Enums/Steps';
import NominalBox from './Components/NominalBox';
import AdditionalData from './Components/AdditionalData';
import Measures from './Components/Measures';
import Loading from './Components/Loading';
import Results from './Components/Results';

const App: React.FC = () => {
  const { step } = useContext(PlataformContext)

  return (
    <div className="mainContainer">
        <h1>Plataforma - Portaria nº 294</h1>
        <div className="centralContainer">
          {step === Steps.AskDimensions && <DimensionsBox/>}
          {step === Steps.AskNominal && <NominalBox/>}
          {step === Steps.AskAdditionalData && <AdditionalData/>}
          {step === Steps.AskMeasures && <Measures/>}
          {step === Steps.Calculation && <Loading/>}
          {step === Steps.ShowResults && <Results/>}
        </div>
    </div>
  );
}

export default App;

