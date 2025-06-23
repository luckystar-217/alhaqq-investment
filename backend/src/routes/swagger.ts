import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';

const router = Router();

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Alhaqq Investment API',
    version: '1.0.0',
  },
  paths: {},
};

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
