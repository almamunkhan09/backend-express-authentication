// Import required packages
import * as dotenv from 'dotenv';
import Express from 'express';
import routes from './routes';
import connect from './utils/connect';
import logger from './utils/logger';

dotenv.config();

const app = Express();
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
