import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import PostRepository from '../repositories/PostRepository';
import CreatePostService from '../services/CreatePostService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import CreateLikeService from '../services/CreateLikeService';

const postRoutes = Router();
postRoutes.use(ensureAuthenticated);

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
    return response.status(400).json({ error: err.message });
  }
});

postRoutes.post('/:id/post', async (request, response) => {
  try {
    const { id } = request.params;

    const like = new CreateLikeService();

    const addLikeToPost = await like.execute(id);

    return response.json(addLikeToPost);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default postRoutes;
