import React, { useEffect, useState } from 'react';
import './App.css';
import {
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { CheckCircleOutlined } from '@mui/icons-material';

const App = () => {
  const [valueData, setValueData] = useState({
    value1Rate: null,
    value2Rate: null,
  });

  const [statusFile, setStatusFile] = useState({
    item1Status: null,
    item2Status: null,
  });

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:4001/values');

    eventSource.onmessage = (event) => {
      const valueData = JSON.parse(event.data);
      setValueData({ ...valueData });
    };

    return () => eventSource.close();
  }, []);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:4001/progress');

    eventSource.onmessage = (event) => {
      const statusData = JSON.parse(event.data);
      setStatusFile({ ...statusData });
    };

    return () => eventSource.close();
  }, []);

  return (
    <>
      <div>
        <p>Valores:</p>
        <div>
          {valueData.value1Rate ? <p>Valor 1: {valueData.value1Rate}</p> : null}
          {valueData.value2Rate ? <p>Valor 2: {valueData.value2Rate}</p> : null}
        </div>
      </div>
      <div className='box-status'>
        <div className='box-top'>Fila de carregamento</div>
        <div className='box-content'>
          <List
            sx={{
              bgcolor: 'background.paper',
              padding: '10px',
            }}
          >
            <ListItem
              key={'item1'}
              disableGutters
              secondaryAction={
                statusFile.item1Status !== 'finished' ? (
                  <CircularProgress
                    size={25}
                    sx={{
                      padding: '10px 20px',
                    }}
                  />
                ) : (
                  statusFile.item1Status === 'finished' && (
                    <CheckCircleOutlined color='success' />
                  )
                )
              }
            >
              <ListItemText primary={`List Item 1`} />
            </ListItem>
            <Divider />
            <ListItem
              key={'item2'}
              disableGutters
              secondaryAction={
                statusFile.item2Status !== 'finished' ? (
                  <CircularProgress
                    size={25}
                    sx={{
                      padding: '10px 20px',
                    }}
                  />
                ) : (
                  statusFile.item2Status === 'finished' && (
                    <CheckCircleOutlined color='success' />
                  )
                )
              }
            >
              <ListItemText primary={`List Item 2`} />
            </ListItem>
            <Divider />
            <ListItem
              key={'item3'}
              disableGutters
              secondaryAction={
                <CircularProgress
                  size={25}
                  sx={{
                    padding: '10px 20px',
                  }}
                />
              }
            >
              <ListItemText primary={`List Item 3`} />
            </ListItem>
            <Divider />
          </List>
        </div>
      </div>
    </>
  );
};

export default App;
