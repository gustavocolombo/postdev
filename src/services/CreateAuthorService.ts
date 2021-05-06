import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Author from '../models/Author';
import AuthorRepository from '../repositories/AuthorRepository';

interface Author{
  id: string;
  name: string;
  email: string;
  password: string;
  expertise: string;
  region: string;
}

export default class CreateAuthorService {
  public async execute({
    name, email, password, expertise, region,
  }: Author): Promise<Author> {
    const authorRepository = getCustomRepository(AuthorRepository);

    const validate = await authorRepository.findOne({
      where: { email },
    });

    if (validate) {
      throw new Error('this email is been already used');
    }

    const hashedPassword = await hash(password, 8);

    const author = authorRepository.create({
      name, email, password: hashedPassword, expertise, region,
    });

    await authorRepository.save(author);

    return author;
  }
}
