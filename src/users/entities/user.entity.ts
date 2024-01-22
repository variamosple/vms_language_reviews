import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ type: 'text' })
  id: string;

  @Column({ type: 'text' })
  user: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  email: string;
}
