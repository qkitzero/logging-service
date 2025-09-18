import { Request, Response } from "express";

export class LogController {
  async getLogs(req: Request, res: Response): Promise<void> {
    res.status(200).send({ message: "get logs" });
  }
}
