import { Express, Request, Response } from 'express';
import { createUserhandler } from './controller/user.controller';
import validate from './middleware/validateResource';
import { createUserSchema } from './schemaValidation/user.schema';

export default function routes(app: Express) {
  app.get('/api/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.post('/api/users', validate(createUserSchema), createUserhandler);
}
