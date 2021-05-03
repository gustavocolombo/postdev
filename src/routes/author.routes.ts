import { Router } from 'express';
import AuthorRepository from '../repositories/AuthorRepository';
import CreateAuthorService from '../services/CreateAuthorService';

const authorRoutes = Router();
const authorRepository = new AuthorRepository();
const createAuthorService = new CreateAuthorService(authorRepository);

authorRoutes.get('/', (request, response) => {
  const findAll = authorRepository.find();

  return response.json(findAll);
});

authorRoutes.post('/', (request, response) => {
  try {
    const {
      name, email, password, expertise, region,
    } = request.body;

    const author = createAuthorService.execute({
      name, email, password, expertise, region,
    });

    return response.json(author);
  } catch (err) {
    return response.json({ error: err.message });
  }
});

export default authorRoutes;
