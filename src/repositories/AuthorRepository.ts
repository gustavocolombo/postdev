import { EntityRepository, Repository } from 'typeorm';
import Author from '../models/Author';

@EntityRepository(Author)
export default class AuthorRepository extends Repository<Author | null> {
  public async validateToCreate(email: string): Promise<Author | null> {
    const authorValidated = await this.findOne({ where: { email } });

    return authorValidated || null;
  }
}
