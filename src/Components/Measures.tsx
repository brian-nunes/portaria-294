import React, { useContext, useState } from 'react';
import { PlataformContext } from '../Context/PlataformContext';
import Steps from '../Enums/Steps';
import '../styles/Measures.css';

const Measures: React.FC = () => {
  const { setStep, sample, setMeasures, multiplier } = useContext(PlataformContext);
  const [csvFile, setCsvFile] = useState<File | undefined>(undefined);
  const [textboxContent, setTextboxContent] = useState<string>('');
  const [validated, setValidated] = useState<boolean>(false);
  const [nextClicked, setNextClicked] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('Existem erros nos dados fornecidos, por favor faça os ajustes necessários.');

  const handleCsvFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidated(false);
    const inputs = document.querySelectorAll('.measuresBox__textarea');
    inputs[0].classList.remove('valid');
    inputs[0].classList.remove('invalid');
    (inputs[0] as HTMLInputElement).value = "";

    if (event.target.files && event.target.files[0]) {
      setCsvFile(event.target.files[0]);
    } else {
      setCsvFile(undefined);
    }
  }

  const handleMeasuresInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValidated(false);
    const inputs = document.querySelectorAll('.measuresBox__textarea');
    inputs[0].classList.remove('valid');
    inputs[0].classList.remove('invalid');
      
    setTextboxContent(event.target.value);
  }

  const handleCSV = (callback: (measures: string[][]) => void) => {
    let _measures: string[][] = [];
    const reader = new FileReader();
    reader.onload = () => {
      const csvData = reader.result as string;
      _measures = csvData.trim().split('\n').map(row => row.split(','));
      callback(_measures);
    }
  
    reader.readAsText(csvFile || new Blob());
  }
  

  const handleTextbox = () => {
    let _measures: string[][] = textboxContent.trim().split('\n').map(row => row.split(','));
    return _measures;
  }

  const handleValidate = () => {
    setNextClicked(true);
    if (validated) {
        setStep(Steps.Calculation);
        console.log("New step: Calculation");
    }
    try {
      const callback = (_measures: string[][]) => {       
        let sum = 0;
        for(let i = 0; i < multiplier; i++){
          sum += _measures[i].length
          if(_measures[i].length !== sample/multiplier){
              setErrorMessage("O número de medidas da linha "+(i+1)+" não é compatível com a amostra necessária. ("+sample/multiplier+")");
              const inputs = document.querySelectorAll('.measuresBox__textarea');
              inputs[0].classList.add('invalid');
              return;
          }
        }
        if(sum!== sample){
          setErrorMessage("O número de medidas não é compatível com a amostra necessária.");
          const inputs = document.querySelectorAll('.measuresBox__textarea');
          inputs[0].classList.add('invalid');
          return;
        }
  
        setErrorMessage("")
        setMeasures(_measures.map(row => row.map(str => parseFloat(str))));
        setValidated(true);

        try{
          const inputs = document.querySelectorAll('.measuresBox__textarea');

          (inputs[0] as HTMLInputElement).value = _measures.toString();
          inputs[0].classList.add('valid');
          inputs[0].classList.remove('invalid');
        } catch (e) {
          // nothing
        }
      };
  
      if (csvFile) {
        handleCSV(callback);
      } else {
        const _measures = handleTextbox();
        callback(_measures);
      }
        
    } catch (error) {
      setErrorMessage('Erro ao processar arquivo ou conteúdo');
      const inputs = document.querySelectorAll('.measuresBox__textarea');
      inputs[0].classList.add('invalid');
      console.error((error as Error).message);
    }
  }
  

  const handlePrevius = () => {
    setStep(Steps.AskAdditionalData);
    console.log("New step: AskAdditional");
  }

  return (
    <div className="measuresBox">
      <h1 className='measuresBox__h1'>{"Forneça " + sample.toString() + " medidas: "}</h1>
      <div className="inputContainer">
        <label className="measuresBox__label">Insira as medidas: </label>
        <input type="file" className="measuresBox__inputFile" accept="text/csv" onChange={handleCsvFileChange} />
      </div>
      <p className="measuresBox__or">ou</p>
    <textarea className="measuresBox__textarea" onChange={handleMeasuresInputChange} placeholder="Insira as medidas separadas por vírgula, com as dimensões separadas por linhas, se necessário."></textarea>
      {(nextClicked && errorMessage !== "") && <p className="msg_erro">{errorMessage}</p>}
      <div className="navButtons">
        <button className="measuresBox__button measuresBox__button--prev" onClick={handlePrevius}>Anterior</button>
        <button className="measuresBox__button measuresBox__button--next" onClick={handleValidate}>{!validated ? "Visualizar" : "Próximo"}</button>
      </div>
    </div>
  );
}

export default Measures;