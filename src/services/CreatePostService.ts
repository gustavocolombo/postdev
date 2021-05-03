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
  private postRepository = getCustomRepository(PostRepository);

  public execute({ author, date, topic }: Post):Post {
    const parsedDate = startOfHour(date);

    const post = this.postRepository.create({ author, date: parsedDate, topic });

    return post;
  }
}
