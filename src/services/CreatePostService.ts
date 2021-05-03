import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Post from '../models/Post';
import PostRepository from '../repositories/PostRepository';

interface Post{
  id: string;
  author: string;
  topic: string;
  date: Date;
}

export default class CreatePostRepository {
  public async execute({ author, date, topic }: Post):Promise<Post> {
    const postRepository = getCustomRepository(PostRepository);
    const parsedDate = startOfHour(date);

    const post = postRepository.create({ author, date: parsedDate, topic });

    await postRepository.save(post);

    return post;
  }
}
