import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import PostRepository from '../repositories/PostRepository';
import CreatePostService from '../services/CreatePostService';

const postRoutes = Router();

postRoutes.get('/posts', async (request, response) => {
  const postRepository = getCustomRepository(PostRepository);
  const findAll = await postRepository.find();

  return response.json(findAll);
});

postRoutes.get('/', async (request, response) => {
  const postRepository = getCustomRepository(PostRepository);
  const { dateToSearch } = request.body;

  const parsedDateToSearch = parseISO(dateToSearch);

  const findPostByDate = await postRepository.findPostByDate(parsedDateToSearch);

  return response.json({ findPostByDate });
});

postRoutes.post('/', async (request, response) => {
  try {
    const {
      date, author_id, topic, message,
    } = request.body;

    const dateParsed = parseISO(date);

    const createPostService = new CreatePostService();

    const post = await createPostService.execute({
      date: dateParsed, author_id, topic, message,
    });

    return response.json({ post });
  } catch (err) {
    return response.json({ error: err.message });
  }
});

export default postRoutes;
