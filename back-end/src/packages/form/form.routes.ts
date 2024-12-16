import express from 'express';
import { FormRepository } from '../../infra/repositories';
const formRepository = new FormRepository();
import FormController from './form.controller';

import { CreateFormUseCase } from './use-cases/create';

const listUseCase = new CreateFormUseCase(formRepository);
const controller = new FormController(listUseCase);

const router = express.Router();

router.route('/').post(controller.create.bind(controller));

export default router;
