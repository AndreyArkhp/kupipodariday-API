import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Offer } from 'src/offers/entities/offer.entity';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({
    length: 250,
  })
  name: string;
  @Column()
  link: string;
  @Column()
  image: string;
  @Column({
    scale: 2,
  })
  price: number;
  @Column({
    scale: 2,
  })
  raised: number;
  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;
  @Column({
    length: 1024,
  })
  description: string;
  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];
  @Column()
  copied: number;
}
