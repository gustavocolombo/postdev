import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import AuthorRepository from '../repositories/AuthorRepository';
import CreateAuthorService from '../services/CreateAuthorService';
import UpdatePasswordService from '../services/UpdatePasswordService';

const authorRoutes = Router();

authorRoutes.get('/', async (request, response) => {
  const authorRepository = getCustomRepository(AuthorRepository);
  const findAll = await authorRepository.find();

  return response.json(findAll);
});

authorRoutes.get('/?_author-name', async (request, response) => {
  const authorRepository = getCustomRepository(AuthorRepository);

  const { authorName } = request.body;

  const findAuthorByName = await authorRepository.findByName(authorName);

  return response.json({ findAuthorByName });
});

authorRoutes.post('/', async (request, response) => {
  try {
    const {
      name, email, password, expertise, region,
    } = request.body;

    const createAuthorService = new CreateAuthorService();

    const author = await createAuthorService.execute({
      name, email, password, expertise, region,
    });

    delete author.password;

    return response.json(author);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

authorRoutes.put('/update', async (request, response) => {
  try {
    const { email, password, new_password } = request.body;

    const updatePasswordService = new UpdatePasswordService();

    const updatePassword = await updatePasswordService.execute(
      { email, password, new_password },
    );

    return response.json({ updatePassword });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default authorRoutes;
