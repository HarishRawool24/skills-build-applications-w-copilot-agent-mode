import express from 'express';
import cors from 'cors';
import './config/database.js';
import { apiRouter } from './routes/api.js';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());
app.use(cors());

app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-backend' });
});

app.listen(port, '0.0.0.0', () => {
  const codespaceName = process.env.CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-${port}.app.github.dev`
    : `http://localhost:${port}`;
  console.log(`OctoFit Tracker API listening at ${baseUrl}`);
});
