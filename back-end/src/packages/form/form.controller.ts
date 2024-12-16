import { NextFunction, Request, Response } from 'express';
import { CreateFormUseCase } from './use-cases/create';
import { CreateFormDto } from './use-cases/create/create-form.dto';
import { Form } from '../../domain/entities';

export default class FormController {
  constructor(private readonly CreateFormUseCase: CreateFormUseCase) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const form: Form = CreateFormDto.validate(req.body);
      const response = await this.CreateFormUseCase.handle(form);
      return res.status(201).json({
        response,
      });
    } catch (error) {
      return next(error);
    }
  }
}
