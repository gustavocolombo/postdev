import Author from '../models/Author';

interface Author{
  id: string;
  name: string;
  email: string;
  password: string;
  expertise: string;
  region: string;
}

export default class AuthorRepository {
  private authors : Author[];

  constructor() {
    this.authors = [];
  }

  public find(): Author[] {
    return this.authors;
  }

  public create({
    name, email, password, region, expertise,
  }: Author): Author {
    const author = new Author({
      name, email, password, expertise, region,
    });

    this.authors.push(author);

    return author;
  }
}
