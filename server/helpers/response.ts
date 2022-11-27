import { Response } from 'express';

export const sendSuccess = (res: Response, data: any) => {
  res.status(200).json(data);
};

export const catchAsync = (fn: any) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
    next(err);
  });
};
