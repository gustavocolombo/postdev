import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Post from '../models/Post';
import PostRepository from '../repositories/PostRepository';

interface Post{
  id: string;
  author: string;
  topic: string;
  message: string;
  date: Date;
}

export default class CreatePostRepository {
  public async execute({
    author, date, topic, message,
  }: Post):Promise<Post> {
    const postRepository = getCustomRepository(PostRepository);
    const parsedDate = startOfHour(date);

    const validateMessageToCreate = await postRepository.validateMessage(message);

    if (validateMessageToCreate) {
      throw new Error('This message was not created, it is not allowed to create the same message');
    }

    const post = postRepository.create({
      author, date: parsedDate, topic, message,
    });

    await postRepository.save(post);

    return post;
  }
}
