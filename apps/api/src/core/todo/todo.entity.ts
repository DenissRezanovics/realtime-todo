import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Todo extends Model {
  @Column
  markAsDone: boolean;

  @Column
  title: string;

  @Column
  description: string;
}
