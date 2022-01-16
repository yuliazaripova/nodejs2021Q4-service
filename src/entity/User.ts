import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from './Task';

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  name!: string;

  @Column("varchar")
  login!: string;

  @Column("varchar")
  password!: string;

  @OneToMany(() => Task, task => task.userId)
  tasks!: Task[];
}
