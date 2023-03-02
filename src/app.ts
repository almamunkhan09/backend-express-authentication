// Import required packages
import * as dotenv from 'dotenv';
import express from 'express';
import routes from './routes';
import connect from './utils/connect';
import logger from './utils/logger';

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3500;
// console.log(PORT);

app.listen(PORT, async () => {
  logger.info(`Application is listening at http://localhost:${PORT}`);
  await connect();
  routes(app);
});

app.get('/', (req, res) => {
  res.status(200).json('Hello');
});
