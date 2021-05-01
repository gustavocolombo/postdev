import { Router } from 'express';
import Post from '../models/Post';

const postRoutes = Router();

interface Post{
  id: string;
  author: string;
  topic: string;
  date: Date;
}

const posts: Post[] = [];

postRoutes.post('/', (request, response) => {
  const { author, date, topic } = request.body;

  const post = new Post({ author, date, topic });

  posts.push(post);

  return response.json(post);
});

export default postRoutes;
