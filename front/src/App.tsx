import React, { useEffect, useState } from 'react';

const App = () => {
  const [stockData, setStockData] = useState({
    stock1Rate: null,
    stock2Rate: null,
  });

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:4001/values');

    eventSource.onmessage = (event) => {
      const stockData = JSON.parse(event.data);
      setStockData({ ...stockData });
    };

    return () => eventSource.close();
  }, []);

  return (
    <div>
      <p>Valores:</p>
      <div>
        {stockData.stock1Rate ? <p>Valor 1: {stockData.stock1Rate}</p> : null}
        {stockData.stock2Rate ? <p>Valor 2: {stockData.stock2Rate}</p> : null}
      </div>
    </div>
  );
};

export default App;
