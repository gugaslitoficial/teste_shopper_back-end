import express from 'express';
import bodyParser from 'body-parser';
import uploadRouter from './routes/upload';
import confirmRouter from './routes/confirm';
import listRouter from './routes/list';

const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: '10mb' }));

app.use('/upload', uploadRouter);
app.use('/confirm', confirmRouter);
app.use('/list', listRouter);

app.listen(port, () => {
  console.log(`O servidor está rodando na porta ${port}`);
});