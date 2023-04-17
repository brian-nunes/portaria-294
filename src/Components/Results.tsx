import React, { useContext } from 'react';
import '../styles/Results.css';
import { PlataformContext } from '../Context/PlataformContext';

const Results: React.FC = () => {
    const { approved, cleanUp } = useContext(PlataformContext);

    return (
      <div>
        {approved ? (
        <span>Aprovado</span>
        ) : (
        <span>Reprovado</span>
        )}
        <button className="backButton" onClick={cleanUp}>Voltar ao início</button>
      </div>
    );
};

export default Results;
