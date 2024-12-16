import express, { Request, Response } from 'express';
import FormRoutes from './packages/form/form.routes';
import ColorsRoute from './packages/colors/colors.routes';
const router = express.Router();

router.use('/form', FormRoutes);
router.use('/colors', ColorsRoute);
router.use('/health', (_req: Request, res: Response) => res.status(200).send());

export default router;
