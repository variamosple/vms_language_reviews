import { LanguageReview } from 'src/languagereviews/entities/languagereview.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reviewer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  email: string;

  @ManyToOne(() => LanguageReview, (languageReview) => languageReview.id)
  languageReview: LanguageReview;
}
