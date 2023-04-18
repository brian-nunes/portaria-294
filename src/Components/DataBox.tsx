import { useContext, useEffect } from "react";
import { PlataformContext } from "../Context/PlataformContext";
import "../styles/DataBox.css"
import {dimensionToSring} from "../Enums/Dimensions"

const DataBox: React.FC = () => {
    const {dimension,faixaLote,imprecision,measuresNominal,sample, multiplier} = useContext(PlataformContext);

    useEffect(() => {
        console.log()
    }, [dimension, faixaLote, imprecision, measuresNominal, sample]);

    return(
        <div className="containerDataBox">
            <h1 className="tituloDataBox">Resumo dos dados:</h1>
            <div className="containerInnerDataBox">
                <p className='pDataBox'>Medida{dimensionToSring(dimension) === '' || dimensionToSring(dimension) === 'C' ? '' : 's' } Nomina{dimensionToSring(dimension) === '' || dimensionToSring(dimension) === 'C' ? 'l' : 'is' } ({dimensionToSring(dimension) !== '' ? dimensionToSring(dimension) : "-"}): {measuresNominal.filter(value => value > 0).join("x") !== '' ? measuresNominal.filter(value => value > 0).join("x")  : "-"}</p>
                <p className='pDataBox'>Faixa de Lote: {faixaLote !== '' ? faixaLote : "-"}</p>
                <p className='pDataBox'>Imprecisão: {imprecision  > 0 ? imprecision : "-"}</p>
                <p className='pDataBox'>Tamanho da Amostra: {sample  > 0 ? sample/multiplier : "-"}</p>
            </div>
        </div>
    )
}

export default DataBox;