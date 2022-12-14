import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
  @Column({
    scale: 2,
  })
  amount: number;
  @Column({
    default: false,
  })
  hidden: boolean;
}
