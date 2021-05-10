/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePost1620012591239 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'posts',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'author',
          type: 'varchar',
        },
        {
          name: 'topic',
          type: 'varchar',
        },
        {
          name: 'message',
          type: 'varchar',
          length: '1110',
        },
        {
          name: 'comment',
          type: 'varchar',
          length: '1110',
          default: '0',
        },
        {
          name: 'like',
          type: 'integer',
          default: 0,
          generationStrategy: 'increment',
        },
        {
          name: 'date',
          type: 'timestamp',
        },
        {
          name: 'created_at',
          type: 'timestamp with time zone',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp with time zone',
          default: 'now()',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('posts');
  }
}
