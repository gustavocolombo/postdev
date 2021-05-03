import { startOfHour } from 'date-fns';
import Post from '../models/Post';
import PostRepository from '../repositories/PostRepository';

interface Post{
  id: string;
  author: string;
  topic: string;
  date: Date;
}

export default class CreatePostRepository {
  private postRepository : PostRepository;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  public execute({ author, date, topic }: Post):Post {
    const parsedDate = startOfHour(date);

    const post = this.postRepository.create({ author, date: parsedDate, topic });

    return post;
  }
}
