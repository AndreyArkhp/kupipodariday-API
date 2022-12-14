import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Length, IsUrl, IsInt, IsPositive, IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Offer } from 'src/offers/entities/offer.entity';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column({
    length: 250,
  })
  @Length(1, 250)
  @IsString()
  name: string;
  @Column()
  @IsUrl()
  link: string;
  @Column()
  @IsUrl()
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
  @Length(1, 1024)
  @IsString()
  description: string;
  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];
  @Column()
  @IsInt()
  @IsPositive()
  copied: number;
}
