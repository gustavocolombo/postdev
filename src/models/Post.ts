import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne,
} from 'typeorm';

import Author from './Author';

@Entity('posts')
export default class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Post) // qual model que ele deve entrar
  @JoinColumn({ name: 'author_id' })
  // eslint-disable-next-line max-len
  author_id: Author; // quantos autores meu post tem? One. E quantos posts o Author pode fazer? Many - o relacionamento parte do post, logo many to one

  @Column()
  topic: string;

  @Column()
  message: string;

  @Column()
  like: number;

  @Column()
  comment: string;

  @Column()
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
