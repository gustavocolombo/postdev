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
  private authorRepository:AuthorRepository;

  constructor(authorRepository: AuthorRepository) {
    this.authorRepository = authorRepository;
  }

  public execute({
    name, email, password, expertise, region,
  }: Author):Author {
    const author = this.authorRepository.create({
      name, email, password, expertise, region,
    });

    return author;
  }
}
