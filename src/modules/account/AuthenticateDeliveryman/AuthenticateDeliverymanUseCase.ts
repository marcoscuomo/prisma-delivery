import { compare } from 'bcrypt'; 
import { sign } from 'jsonwebtoken';

import { prisma } from '../../../database/prismaClient'; 

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    
    const deliveryman = await prisma.clients.findFirst({
      where: {
        username
      }
    });

    if(!deliveryman) {
      throw new Error('Username or password is invalid');
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if(!passwordMatch) {
      throw new Error('Username or password is invalid');
    }

    const token = sign({username}, '12345', {
      subject: deliveryman.id,
      expiresIn: '1d'
    });

    return token;

  }
}