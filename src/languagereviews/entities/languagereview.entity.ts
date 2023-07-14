import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LanguageReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  languageId: number;

  @Column()
  status: string; // review, approved, rejected

  @Column()
  languageOwner: string;

  @Column()
  languageOwnerEmail: string;
}
