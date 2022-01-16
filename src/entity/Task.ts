import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Board } from './Board';
import { User } from './User';

@Entity("task")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  title!: string;

  @Column({ type: "int", nullable: true })
  order!: number;

  @Column("varchar")
  description!: string;

  @Column({ type: "varchar", nullable: true })
  userId!: string;

  @Column({ type: "varchar", nullable: true })
  boardId!: string;

  @Column({ type: "varchar", nullable: true })
  columnId!: string;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Board, (board) => board.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'board' })
  board!: Board;
}
