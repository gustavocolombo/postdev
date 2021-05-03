import { EntityRepository, Repository } from 'typeorm';
import Post from '../models/Post';

@EntityRepository(Post)
export default class PostRepository extends Repository<Post> {
  public async findPostByDate(date: Date): Promise<Post | null> {
    const findPost = await this.findOne({ where: { date } });

    return findPost || null;
  }
}
