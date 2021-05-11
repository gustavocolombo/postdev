import { getCustomRepository } from 'typeorm';
import PostRepository from '../repositories/PostRepository';

interface RequestDTO {
  id: string;
  comment: string;
}

export default class CreateCommentService {
  public async execute({ id, comment }: RequestDTO): Promise<string> {
    const commentRepo = getCustomRepository(PostRepository);

    const validateComment = await commentRepo.findOne({ where: { id } });

    if (!validateComment) {
      throw new Error('Post not found to comment');
    }

    validateComment.comment = await commentRepo.addComment(id, comment);

    const createComment = await commentRepo.save(validateComment);

    return createComment;
  }
}
