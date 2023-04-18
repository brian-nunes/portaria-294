import React, { useContext } from 'react';
import "../styles/DimensionsBox.css"
import { PlataformContext } from '../Context/PlataformContext';
import Dimensions from '../Enums/Dimensions';
import Steps from '../Enums/Steps';
import HelpButton from './HelpButton';

const DimensionsBox: React.FC = () => {
    const { setDimension, setStep } = useContext(PlataformContext);
    const handleSetDimension = (d: Dimensions) => {
        setDimension(d);
        setStep(Steps.AskNominal);
        console.log("New step: AskNominal");
    }
    return (
        <>
            <div className="container">
                <button onClick={() => {handleSetDimension(Dimensions.C)}}>
                    <img src="./c.png" alt="Imagem do botão C" />
                    <span>C</span>
                </button>
                <button onClick={() => {handleSetDimension(Dimensions.CL)}}>
                    <img src="./cxl.png" alt="Imagem do botão CxL" />
                    <span>CxL</span>
                </button>
                <button onClick={() => {handleSetDimension(Dimensions.CLA)}}>
                    <img src="./cxlxa.png" alt="Imagem do botão CxLxA" />
                    <span>CxLxA</span>
                </button>
            </div>
            <div className="container">
                <p>Quantas dimensões relevantes o produto possui?</p>
                <HelpButton/>
            </div>
        </>
    );
}

export default DimensionsBox;