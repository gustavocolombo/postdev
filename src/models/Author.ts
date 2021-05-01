import { uuid } from 'uuidv4';

interface Author{
  id: string;
  name: string;
  email: string;
  password: string;
  expertise: string;
  region: string;
}

export default class Author {
  id: string;

  name: string;

  email: string;

  password: string;

  expertise: string;

  region: string;

  constructor({
    name, email, password, expertise, region,
  }: Author) {
    this.id = uuid();
    this.name = name;
    this.email = email;
    this.password = password;
    this.expertise = expertise;
    this.region = region;
  }
}
