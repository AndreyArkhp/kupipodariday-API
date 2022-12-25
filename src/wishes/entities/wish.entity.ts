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
import { Offer } from '../../offers/entities/offer.entity';
import {
  lengthNumberOfMoney,
  roundToHundredths,
  wishDescriptionLength,
  wishNameLength,
} from '../../common/constants';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({
    length: wishNameLength.max,
  })
  name: string;
  @Column()
  link: string;
  @Column()
  image: string;
  @Column({
    type: 'numeric',
    scale: roundToHundredths,
    default: 0,
  })
  price: number;
  @Column({
    type: 'numeric',
    scale: roundToHundredths,
    default: 0,
  })
  raised: number;
  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;
  @Column({
    length: wishDescriptionLength.max,
  })
  description: string;
  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];
  @Column({ default: 0 })
  copied: number;
}
