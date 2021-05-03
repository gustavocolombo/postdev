import { Router } from 'express';
import { parseISO } from 'date-fns';
import PostRepository from '../repositories/PostRepository';
import CreatePostService from '../services/CreatePostService';

const postRoutes = Router();
const postRepository = new PostRepository();
const createPostService = new CreatePostService(postRepository);

postRoutes.get('/posts', (request, response) => {
  const findAll = postRepository.findAllPosts();

  return response.json(findAll);
});

postRoutes.post('/', (request, response) => {
  try {
    const { author, date, topic } = request.body;

    const dateParsed = parseISO(date);

    const post = createPostService.execute({ author, date: dateParsed, topic });

    return response.json(post);
  } catch (err) {
    return response.json({ error: err.message });
  }
});

export default postRoutes;
