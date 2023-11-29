const express = require('express');

const app = express();

app.get('/values', (_req, res, _next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
  });
  res.flushHeaders();

  const interval = setInterval(() => {
    const value1Rate = Math.floor(Math.random() * 100000);
    const value2Rate = Math.floor(Math.random() * 60000);
    res.write(`data: ${JSON.stringify({ value1Rate, value2Rate })}\n\n`);
  }, 2000);

  res.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

app.get('/progress', (_req, res, _next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
  });
  res.flushHeaders();

  const interval = setInterval(() => {
    const item1Status = 'finished';
    const item2Status = 'finished';
    res.write(`data: ${JSON.stringify({ item1Status, item2Status })}\n\n`);
  }, 5000);

  res.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

app.listen(4001, 'localhost', () => {
  console.log('Server is up and running at port 4001');
});
