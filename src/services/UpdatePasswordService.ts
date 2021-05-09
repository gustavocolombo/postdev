import { getRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import Author from '../models/Author';

interface RequestDTO{
  email: string;
  new_password: string;
}

export default class UpdatePasswordService {
  public async execute({ email, password, new_password }: RequestDTO): Promise<Author> {
    const changePassword = getRepository(Author);

    const author = await changePassword.findOne({ where: { email } });

    if (!author) {
      throw new Error('No author was found with this email');
    }

    const passwordMatched = await compare(password, author.password);

    if (!passwordMatched) {
      throw new Error('Incorrect password to change');
    }

    const hashedNewPassword = await hash(new_password, 8);

    author.password = hashedNewPassword;

    const updatePass = await changePassword.save(author);

    return updatePass;
  }
}
