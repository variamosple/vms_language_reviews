import { Reviewer } from 'src/reviewers/entities/reviewer.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @OneToMany(() => Reviewer, (review) => review.languageReview)
  reviewers: Reviewer[];
}
