import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import Author from '../models/Author';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO{
  author: Author;
  token: string;
}

export default class AuthenticateAuthorService {
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const authentication = getRepository(Author);

    const author = await authentication.findOne({ where: { email } });

    if (!author) {
      throw new Error('Incorrect email/password combination');
    }

    const passwordMatched = await compare(password, author.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: author.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      author,
      token,
    };
  }
}
