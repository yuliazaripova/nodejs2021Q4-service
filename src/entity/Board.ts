import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("board")
export class Board {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  title!: string;

  @Column("json")
  columns!: string;

}