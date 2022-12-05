import { Response } from 'express';

export const sendSuccess = (res: Response, data: any) => {
  res.status(200).json(data);
};

export const sendFailure = (res: Response, error: any) => {
  res.status(error.status).json(error.message);
};

export const catchAsync = (fn: any) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
    next(err);
  });
};
