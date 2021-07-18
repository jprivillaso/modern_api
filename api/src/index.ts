import express from 'express';
import cors from 'cors';

import { registerCounterRoutes } from './routes/counter';
import { getLogger } from './services/logger';

const PORT = process.env.API_PORT || 3333;
const api: express.Application = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(cors());

const setup = async (): Promise<void> => {
  registerCounterRoutes(api);
  api.listen(PORT);
  getLogger().info(`Listening at Port ${PORT}`);
};

(async () => {
  await setup();
})();
