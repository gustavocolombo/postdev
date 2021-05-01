import { Router } from 'express';
import Author from '../models/Author';

const authorRoutes = Router();

interface Author{
  id: string;
  name: string;
  email: string;
  password: string;
  expertise: string;
  region: string;
}

const authors: Author[] = [];

authorRoutes.post('/', (request, response) => {
  const {
    name, email, password, expertise, region,
  } = request.body;

  const author = new Author({
    name, email, password, expertise, region,
  });

  authors.push(author);

  return response.json(author);
});

export default authorRoutes;
