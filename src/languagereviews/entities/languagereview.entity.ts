import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class LanguageReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  languageId: number;

  @Column()
  status: string; // review, approved, rejected

  @Column() 
  languageOwner: number;

  @Column()
  languageOwnerEmail: string;
}
