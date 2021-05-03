import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import PostRepository from '../repositories/PostRepository';
import CreatePostService from '../services/CreatePostService';

const postRoutes = Router();

postRoutes.get('/posts', (request, response) => {
  const postRepository = getCustomRepository(PostRepository);
  const findAll = postRepository.find();

  return response.json(findAll);
});

postRoutes.post('/', async (request, response) => {
  try {
    const { author, date, topic } = request.body;

    const dateParsed = parseISO(date);

    const createPostService = new CreatePostService();

    const post = await createPostService.execute({ author, date: dateParsed, topic });

    return response.json(post);
  } catch (err) {
    return response.json({ error: err.message });
  }
});

export default postRoutes;
