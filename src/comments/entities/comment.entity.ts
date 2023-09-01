import { LanguageReview } from 'src/languagereviews/entities/languagereview.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ type: 'date' })
  date: string;

  @Column()
  status: string; // Open, Solved

  @Column()
  authorName: string;

  @ManyToOne(() => LanguageReview, (languageReview) => languageReview.id)
  languageReview: LanguageReview;
}
