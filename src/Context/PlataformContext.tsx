import { createContext, useEffect, useState } from "react";
import Steps from "../Enums/Steps";
import Dimensions from "../Enums/Dimensions";

export interface PlataformContextType {
  step: Steps;
  dimension: Dimensions;
  measures: number[][];
  measuresNominal: number[];
  faixaLote: string;
  imprecision: number;
  sample: number;
  multiplier: number;
  approved: boolean;
  setStep: (s: Steps) => void;
  setDimension: (d: Dimensions) => void;
  setMeasures: (m: number[][]) => void;
  setMeasuresNominal: (m: number[]) => void;
  setFaixaLote: (fl: string) => void;
  setImprecision: (i: number) => void;
  calculate: () => void;
  cleanUp: () => void;
}

export const PlataformContext = createContext<PlataformContextType>({
  step: Steps.AskDimensions,
  dimension: Dimensions.C,
  measures: [],
  measuresNominal: [],
  faixaLote: '',
  imprecision: 0,
  sample: 0,
  multiplier: 1,
  approved: false,
  setStep: () => {},
  setDimension: () => {},
  setMeasures: () => {},
  setMeasuresNominal: () => {},
  setFaixaLote: () => {},
  setImprecision: () => {},
  calculate: () => {},
  cleanUp: () => {}
});

interface PlataformProviderProps {
    children: React.ReactNode;
}
  
export const PlataformProvider = ({ children }: PlataformProviderProps) => {
    const [step, setStep] = useState<Steps>(Steps.AskDimensions);
    const [dimension, setDimension] = useState<Dimensions>(Dimensions.C);
    const [measures, setMeasures] = useState<number[][]>([]);
    const [measuresNominal, setMeasuresNominal] = useState<number[]>([]);
    const [faixaLote, setFaixaLote] = useState<string>('');
    const [imprecision, setImprecision] = useState<number>(0);
    const [sample, setSample] = useState<number>(0);
    const [multiplier, setMultiplier] = useState<number>(1);
    const [k, setK] = useState<number>(1);
    const [approved, setApproved] = useState<boolean>(false);

    useEffect(() => {
      const faixas = process.env.REACT_APP_FAIXAS_LOTES?.split(",") || [];
      const _sample = process.env.REACT_APP_AMOSTRA_POR_LOTE?.split(",") || [];
      const ks = process.env.REACT_APP_K_POR_LOTE?.split(",") || [];

      const _multiplier = dimension === Dimensions.C ? 1 : (dimension === Dimensions.CL ? 2: 3)
        
      const index: number = faixas.indexOf(faixaLote);
      setMultiplier(_multiplier);
      setSample(+_sample[index] * multiplier);
      setK(+ks[index]);
      // eslint-disable-next-line 
    }, [faixaLote, dimension]);

    function calculateAverage(numbers: number[]): number {
      const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue);
      return sum / numbers.length;
    }
    
    function calculateStandardDeviation(numbers: number[], avg: number): number {
      const squareDiffs = numbers.map((value) => Math.pow(value - avg, 2));
      const avgSquareDiff = calculateAverage(squareDiffs);
      return Math.sqrt(avgSquareDiff);
    }
    
    const calculateData = (m: number[], nominal: number) => {
      const average: number = calculateAverage(m);
      const S: number = calculateStandardDeviation(m, average);
      const individualGoal: number = process.env.REACT_APP_TOLERANCIA_INDIVIDUAL !== undefined ? +process.env.REACT_APP_TOLERANCIA_INDIVIDUAL : 0;
      const individualLimit: number = nominal - nominal*individualGoal
      const averageApproved: boolean = average >= nominal - (k*S)
      const individuallyApproved: boolean = m.every(measure => measure >= individualLimit);
      const ApprovedImprecision: boolean = imprecision < 0.2*nominal*individualGoal;

      return averageApproved && individuallyApproved && ApprovedImprecision;
    }

    const calculateOneDimension = (whichNominal: number) => {
      const _measures = measures[whichNominal];
      const nominalValue: number = measuresNominal[whichNominal];

      return calculateData(_measures, nominalValue);
    }

    const calculateTwoDimensions = (whichNominalA: number, whichNominalB: number) => {
      const _measures: number[] =[]

      for (let i = 0; i < measures[0].length; i++) {
        _measures[i] = measures[whichNominalA][i] * measures[whichNominalB][i];
      }
      const nominalArea = measuresNominal[whichNominalA] * measuresNominal[whichNominalB];

      return calculateData(_measures, nominalArea);
    }

    const calculateThreeDimensions = () => {
      const _measures: number[] =[]

      for (let i = 0; i < measures[0].length; i++) {
        _measures[i] = measures[0][i] * measures[1][i] * measures[2][i];
      }
      const volumeNominal = measuresNominal[0] * measuresNominal[1] * measuresNominal[2];

      return calculateData(_measures, volumeNominal);
    }

    const calculate = () => {
      let approved: boolean = false;
      if (dimension === Dimensions.C) {
        approved =  calculateOneDimension(0)
      } else if (dimension === Dimensions.CL) {
        approved = calculateOneDimension(0) && calculateOneDimension(1) && calculateTwoDimensions(0, 1)
      } else {
        approved = calculateOneDimension(0) && calculateOneDimension(1) && calculateOneDimension(2) && calculateTwoDimensions(0, 1) && calculateTwoDimensions(1, 2) && calculateTwoDimensions(0, 2) && calculateThreeDimensions()
      }
      setApproved(approved);
      setStep(Steps.ShowResults);
      console.log("New step: ShowResults");
    }

    const cleanUp = () => {
      setStep(Steps.AskDimensions);
      setDimension(Dimensions.C);
      setMeasures([]);
      setMeasuresNominal([]);
      setFaixaLote('');
      setImprecision(0);
      setSample(0);
      setMultiplier(1);
      setK(1);
      setApproved(false);
    }

    return (
        <PlataformContext.Provider value={{ step, dimension, measures, measuresNominal, faixaLote, imprecision, sample, multiplier, approved, setStep, setDimension, setMeasures, setMeasuresNominal, setFaixaLote, setImprecision, calculate, cleanUp }}>
            {children}
        </PlataformContext.Provider>
    );
}