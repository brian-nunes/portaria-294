import React, { useContext, useEffect } from 'react';
import '../styles/Loading.css';
import { PlataformContext } from '../Context/PlataformContext';

const Loading: React.FC = () => {
  const {calculate} = useContext(PlataformContext)

  useEffect(() => {
    calculate();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="loading-wrapper">
      <p className="loading-text">Calculando...</p>
      <div className="spinner" />
    </div>
  );
};

export default Loading;
