import { getCustomRepository } from 'typeorm';
import PostRepository from '../repositories/PostRepository';

export default class CreateLikeService {
  public async execute(id: string): Promise<number> {
    const post = getCustomRepository(PostRepository);

    const findPost = await post.findOne({ where: { id } });

    if (!findPost) {
      throw new Error('Post not found');
    }

    findPost.like = await post.addLike(id);

    const likeOnPost = await post.save(findPost);

    return likeOnPost;
  }
}
