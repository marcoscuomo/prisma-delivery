import { Request, Response } from "express";

import { CreateDeliverymanUseCase } from "./CreateDeliverymanUseCase";

export class CreateDeliverymanController {
  async handle(request: Request, response: Response): Promise<Response>{

    const { username, password } = request.body;

    const createDeliverymantUseCase = new CreateDeliverymanUseCase();  
    const result = await createDeliverymantUseCase.execute({ username, password });

    return response.json(result);
  } 
}