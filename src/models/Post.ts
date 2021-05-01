import { uuid } from 'uuidv4';

interface Post{
  id: string;
  author: string;
  topic: string;
  date: Date;
}

export default class Post {
  id: string;

  author: string;

  topic: string;

  date: Date;

  constructor({ author, topic, date }: Post) {
    this.id = uuid();
    this.author = author;
    this.topic = topic;
    this.date = date;
  }
}
