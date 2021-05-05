/* eslint-disable import/prefer-default-export */
import {
  MigrationInterface, QueryRunner, TableColumn, TableForeignKey,
} from 'typeorm';

export class CreateRelationEnterAuthorAndPost1620164670490 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('posts', 'author');
    await queryRunner.addColumn('posts', new TableColumn({
      name: 'author_id',
      type: 'uuid',
      isNullable: true,
    }));
    await queryRunner.createForeignKey('posts', new TableForeignKey({
      name: 'authorCreatePost',
      columnNames: ['author_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'authors',
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('posts', 'authorCreatePost');
    await queryRunner.dropColumn('posts', 'author_id');
    await queryRunner.addColumn('posts', new TableColumn({
      name: 'author',
      type: 'varchar',
    }));
  }
}
