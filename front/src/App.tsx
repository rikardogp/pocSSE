import React, { useEffect, useState } from 'react';

const App = () => {
  const [valueData, setValueData] = useState({
    value1Rate: null,
    value2Rate: null,
  });

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:4001/values');

    eventSource.onmessage = (event) => {
      const valueData = JSON.parse(event.data);
      setValueData({ ...valueData });
    };

    return () => eventSource.close();
  }, []);

  return (
    <div>
      <p>Valores:</p>
      <div>
        {valueData.value1Rate ? <p>Valor 1: {valueData.value1Rate}</p> : null}
        {valueData.value2Rate ? <p>Valor 2: {valueData.value2Rate}</p> : null}
      </div>
    </div>
  );
};

export default App;
