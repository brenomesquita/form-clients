import express from 'express';
import { ColorsRepository } from '../../infra/repositories';
const colorsRepository = new ColorsRepository();
import ColorsController from './colors.controller';

import { ListColorsUseCase } from './use-cases/list';

const listUseCase = new ListColorsUseCase(colorsRepository);
const controller = new ColorsController(listUseCase);

const router = express.Router();

router.route('/').get(controller.list.bind(controller));

export default router;
