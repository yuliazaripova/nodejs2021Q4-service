import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from './Task';

@Entity("board")
export class Board {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  title!: string;

  @Column("json")
  columns!: string;

  @OneToMany(() => Task, task => task.boardId, { cascade: true })
  tasks!: Task[];
}