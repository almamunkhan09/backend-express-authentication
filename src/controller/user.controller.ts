import { Request, Response } from 'express';
import { any } from 'zod';
import { CreateUserInput } from '../schemaValidation/user.schema';
import { createUser } from '../services/user.service';
import logger from '../utils/logger';

export async function createUserhandler(req: Request, res: Response) {
  try {
    // Controller function
    const user = await createUser(req.body);
    return res.status(200).json(user);
  } catch (err: any) {
    logger.error(err);
    return res.sendStatus(409).send(err.message);
  }
}
