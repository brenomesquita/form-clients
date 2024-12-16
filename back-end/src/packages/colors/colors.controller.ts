import { NextFunction, Request, Response } from 'express';
import { ListColorsUseCase } from './use-cases/list/list-colors.use-case';
import { Colors } from '../../domain/entities';

export default class ColorsController {
  constructor(private readonly listColorsUseCase: ListColorsUseCase) {}

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const colors: Colors[] | null = await this.listColorsUseCase.handle();
      return res.status(200).json({
        colors,
      });
    } catch (error) {
      return next(error);
    }
  }
}
