import React, { useEffect, useState } from 'react';
import './App.css';
import { NRvector } from './models/NRvector';
import { NRmatrix } from './models/NRmatrix';
import { gaussj } from './models/gaussJordan.ts';
import { JulianDayCalculator } from './models/JulianDayCalculator';
import { LunarPhaseCalculator } from './models/LunarPhaseCalculator';

interface InputFormProps {
  year: number;
  month: number;
  day: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  setDay: React.Dispatch<React.SetStateAction<number>>;
  calculateValues: () => void;
  calculateGaussj: () => void;
}

const InputForm: React.FC<InputFormProps> = ({
  year,
  month,
  day,
  setYear,
  setMonth,
  setDay,
  calculateValues,
  calculateGaussj,
}) => (
  <div>
    <h3>Update Date:</h3>
    <label>
      Year:
      <input type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value, 10))} />
    </label>
    <label>
      Month:
      <input type="number" value={month} onChange={(e) => setMonth(parseInt(e.target.value, 10))} />
    </label>
    <label>
      Day:
      <input type="number" value={day} onChange={(e) => setDay(parseInt(e.target.value, 10))} />
    </label>
    <button onClick={calculateValues}>Calculate</button>
    <button onClick={calculateGaussj}>Calculate Gaussj</button>
  </div>
);

interface VectorUpdateProps {
  vecLength: number;
  setVecLength: React.Dispatch<React.SetStateAction<number>>;
  updateVector: () => void;
  vec: NRvector<number>;
}

const VectorUpdate: React.FC<VectorUpdateProps> = ({ vecLength, setVecLength, updateVector, vec }) => {
  // Use useEffect to log the updated vector when it changes
  useEffect(() => {
    console.log('Updated Vector:', vec);
  }, [vec]); // This dependency array ensures that the effect runs whenever the 'vec' state changes

  return (
    <div>
      <h3>Update Vector:</h3>
      <label>
        Vector Length:
        <input type="number" value={vecLength} onChange={(e) => setVecLength(parseInt(e.target.value, 10))} />
      </label>
      <button onClick={updateVector}>Update Vector</button>
      <div className="vector-container">
        {vec.printToScreen().split(', ').map((item, index) => (
          <span key={index} className="vector-element">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
interface MatrixUpdateProps {
  matRows: number;
  matCols: number;
  setMatRows: React.Dispatch<React.SetStateAction<number>>;
  setMatCols: React.Dispatch<React.SetStateAction<number>>;
  updateMatrix: () => void;
  mat: NRmatrix<number>;
}

const MatrixUpdate: React.FC<MatrixUpdateProps> = ({ matRows, matCols, setMatRows, setMatCols, updateMatrix, mat }) => (
  <div>
    <h3>Update Matrix:</h3>
    <label>
      Rows:
      <input type="number" value={matRows} onChange={(e) => setMatRows(parseInt(e.target.value, 10))} />
    </label>
    <label>
      Columns:
      <input type="number" value={matCols} onChange={(e) => setMatCols(parseInt(e.target.value, 10))} />
    </label>
    <button onClick={updateMatrix}>Update Matrix</button>
    <div className="matrix-container">
      {mat.printToScreen().split('; ').map((row, rowIndex) => (
        <div key={rowIndex} className="matrix-row">
          {row.split(', ').map((element, colIndex) => (
            <div key={colIndex} className="matrix-element">
              {element}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

interface ResultsDisplayProps {
  julianDay: number | null;
  dateInfo: {
    mm: number;
    id: number;
    iyyy: number;
  } | null;
  lunarPhase: {
    jd: number;
    frac: number;
  } | null;
  gaussjResults: NRmatrix<number> | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ julianDay, dateInfo, lunarPhase, gaussjResults }) => {
  useEffect(() => {
    console.log('Julian Day:', julianDay);
  }, [julianDay]);

  useEffect(() => {
    console.log('Date Info:', dateInfo);
  }, [dateInfo]);

  useEffect(() => {
    console.log('Lunar Phase:', lunarPhase);
  }, [lunarPhase]);

  useEffect(() => {
    console.log('Gaussj Results:', gaussjResults);
  }, [gaussjResults]);

  return (
    <div>
      <h2>Results:</h2>
      <p>Julian Day: {julianDay !== null ? julianDay : 'N/A'}</p>
      <p>Date Info: {dateInfo && `${dateInfo.mm}/${dateInfo.id}/${dateInfo.iyyy}`}</p>
      <p>Lunar Phase: {lunarPhase && `${lunarPhase.jd}, ${lunarPhase.frac}`}</p>

      {/* Display gaussj results */}
      <p>Gaussj Results:</p>
      {gaussjResults && (
        <div>
          <p>Matrix Dimensions: {gaussjResults.rows} x {gaussjResults.cols}</p>
          <div className="matrix-container">
            {gaussjResults.printToScreen().split('; ').map((row, rowIndex) => (
              <div key={rowIndex} className="matrix-row">
                {row.split(', ').map((element, colIndex) => (
                  <div key={colIndex} className="matrix-element">
                    {element}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


// Separate component for the main App
const App: React.FC = () => {

  // state variables
  const [year, setYear] = useState<number>(2024);
  const [month, setMonth] = useState<number>(1);
  const [day, setDay] = useState<number>(6);

  const [gaussjResults, setGaussjResults] = useState<NRmatrix<number> | null>(null); // New state for gaussj results

  const [julianDay, setJulianDay] = useState<number | null>(null);
  const [dateInfo, setDateInfo] = useState<{ mm: number; id: number; iyyy: number } | null>(null);
  const [lunarPhase, setLunarPhase] = useState<{ jd: number; frac: number } | null>(null);

  const [vec, setVec] = useState<NRvector<number>>(() => new NRvector<number>(3));
  const [matRows, setMatRows] = useState<number>(3);
  const [matCols, setMatCols] = useState<number>(3);
  const [mat, setMat] = useState<NRmatrix<number>>(() => new NRmatrix<number>(matRows, matCols, 0));

  const [vecLength, setVecLength] = useState<number>(3);

  const handleMatrixError = (error: unknown) => {
    if (error instanceof Error) {
      console.error(error.message);
      window.alert(error.message); // Display an alert on the webpage
    } else {
      console.error('An unknown error occurred.');
      window.alert('An unknown error occurred.'); // Display an alert on the webpage
    }
  };

  const updateMatrix = () => {
    try {
      if (matRows <= 0 || matCols <= 0) {
        throw new Error('Invalid matrix dimensions. Rows and columns must be greater than zero.');
      }

      setMat(new NRmatrix<number>(matRows, matCols, 0));
    } catch (error) {
      handleMatrixError(error);
    }
  };

  const updateVector = () => {
    try {
      // Create a new vector with the updated length
      const newVec = new NRvector<number>(vecLength);
  
      // Copy the values from the old vector to the new vector
      for (let i = 0; i < Math.min(vec.length, newVec.length); i++) {
        newVec.set(i, vec.get(i));
      }
  
      // Update the state with the new vector
      setVec(newVec);
    } catch (error) {
      handleMatrixError(error);
    }
  };
  

  const calculateValues = () => {
    const julianDayCalculator = new JulianDayCalculator();
    const lunarPhaseCalculator = new LunarPhaseCalculator();

    const jd = julianDayCalculator.julday(month, day, year);
    const di = julianDayCalculator.caldat(jd);
    const lp = lunarPhaseCalculator.flmoon(1, 0);

    setJulianDay(jd);
    setDateInfo(di);
    setLunarPhase(lp);
  };

  const calculateGaussj = () => {
    try {
      const a = new NRmatrix<number>(mat.rows, mat.cols, 0);
      for (let i = 0; i < mat.rows; i++) {
        for (let j = 0; j < mat.cols; j++) {
          a.set(i, j, mat.get(i, j));
        }
      }
  
      if (a.rows <= 0 || a.cols <= 0) {
        throw new Error('Invalid matrix dimensions. Rows and columns must be greater than zero.');
      }
  
      const b = new NRmatrix<number>(a.rows, 0);
      gaussj(a, b);
      setGaussjResults(a);
    } catch (error) {
      handleMatrixError(error);
    }
  };
  
  


  return (
    <div>
      <InputForm
        year={year}
        month={month}
        day={day}
        setYear={setYear}
        setMonth={setMonth}
        setDay={setDay}
        calculateValues={calculateValues}
        calculateGaussj={calculateGaussj}
      />
      <ResultsDisplay
        julianDay={julianDay}
        dateInfo={dateInfo}
        lunarPhase={lunarPhase}
        gaussjResults={gaussjResults} // Pass gaussj results to ResultsDisplay
      />
      <VectorUpdate
        vecLength={vecLength}
        setVecLength={setVecLength}
        updateVector={updateVector}
        vec={vec}
      />
      <MatrixUpdate
        matRows={matRows}
        matCols={matCols}
        setMatRows={setMatRows}
        setMatCols={setMatCols}
        updateMatrix={updateMatrix}
        mat={mat}
      />
    </div>
  );
};

export default App;
