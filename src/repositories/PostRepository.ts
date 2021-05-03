import { isEqual } from 'date-fns';
import Post from '../models/Post';

interface Post{
  id: string;
  author: string;
  topic: string;
  date: Date;
}

export default class PostRepository {
  private posts : Post[];

  constructor() {
    this.posts = [];
  }

  public findAllPosts(): Post[] {
    return this.posts;
  }

  public create({ author, date, topic }: Post): Post {
    const post = new Post({ author, date, topic });

    this.posts.push(post);

    return post;
  }

  public findPostByDate(date: Date): Post | null {
    const findPost = this.posts.find((post) => isEqual(date, post.date));

    return findPost || null;
  }
}
