import { NextFunction, Request, Response } from 'express';
import { AuthError } from '../../application/errors';
import { InvalidLevelError } from '../../domain/log/level';
import { ErrorMiddleware } from './error';

const createMockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('ErrorMiddleware', () => {
  describe('notFoundHandler', () => {
    it('should return 404 with NotFoundError', () => {
      const req = {} as Request;
      const res = createMockResponse();

      ErrorMiddleware.notFoundHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'NotFoundError',
        message: 'The requested resource was not found',
      });
    });
  });

  describe('errorHandler', () => {
    const next = jest.fn() as NextFunction;

    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return 500 for a generic Error', () => {
      const err = new Error('Something went wrong');
      const req = {} as Request;
      const res = createMockResponse();

      ErrorMiddleware.errorHandler(err, req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Error',
        message: 'Something went wrong',
      });
    });

    it('should return 400 for a domain error', () => {
      const err = new InvalidLevelError('Invalid level');
      const req = {} as Request;
      const res = createMockResponse();

      ErrorMiddleware.errorHandler(err, req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'InvalidLevelError',
        message: 'Invalid level',
      });
    });

    it('should return 401 for an AuthError', () => {
      const err = new AuthError('Unauthorized');
      const req = {} as Request;
      const res = createMockResponse();

      ErrorMiddleware.errorHandler(err, req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: 'AuthError',
        message: 'Unauthorized',
      });
    });
  });
});
