import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import type { UUID } from 'crypto';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: UUID;

  @Column()
  name: string;

  @Column()
  description: string;
}
