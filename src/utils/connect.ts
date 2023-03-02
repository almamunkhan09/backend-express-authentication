// Import required packages

import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from './logger';

dotenv.config();

export default async function connect() {
  const dbUri = process.env.MONGOURL;
  if (dbUri === undefined) throw new Error('There is no database url defined');
  try {
    await mongoose.connect(dbUri);
    logger.info(`Succesful Connection to database`);
  } catch (error) {
    logger.error('Could not connect to the database');
    process.exit(1);
  }
}
