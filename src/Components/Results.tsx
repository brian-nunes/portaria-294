import React, { useContext } from 'react';
import '../styles/Results.css';
import { PlataformContext } from '../Context/PlataformContext';

const Results: React.FC = () => {
    const { approved, errors, cleanUp } = useContext(PlataformContext);

    return (
      <div>
        {approved ? (
        <span>Aprovado</span>
        ) : (
        <>
        <span>Reprovado</span>
        <br/>
        <div className="divScroll">
          <ul>
              {errors.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
        </div>
        <button className="backButton" onClick={cleanUp}>Voltar ao início</button>
        </>
        )}
      </div>
    );
};

export default Results;
