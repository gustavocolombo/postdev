import { Router } from 'express';
import AuthenticateAuthorService from '../services/AuthenticateAuthorService';

const authenticateRoutes = Router();

authenticateRoutes.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authentication = new AuthenticateAuthorService();

    const { author, token } = await authentication.execute({ email, password });

    delete author.password;

    return response.json({ author, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default authenticateRoutes;
