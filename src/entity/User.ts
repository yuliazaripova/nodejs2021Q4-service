import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
