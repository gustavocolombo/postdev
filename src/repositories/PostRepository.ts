import { EntityRepository, Repository } from 'typeorm';
import Post from '../models/Post';

@EntityRepository(Post)
export default class PostRepository extends Repository<Post> {
  public async findPostByDate(date: Date): Promise<Post | null> {
    const findPost = await this.findOne({ where: { date } });

    return findPost || null;
  }

  public async validateMessage(message: string): Promise<Post | null> {
    const validateMessage = await this.findOne({ where: { message } });

    return validateMessage || null;
  }

  public async addLike(id: string): Promise<number> {
    const findPostToLike = await this.findOne({ where: { id } });

    if (!findPostToLike) {
      throw new Error('Post not found');
    }

    const addLike = findPostToLike.like + 1;

    return addLike;
  }
}
