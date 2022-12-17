import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Wish } from '../../wishes/entities/wish.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({
    unique: true,
    length: 30,
  })
  username: string;
  @Column({
    default: 'Пока ничего не рассказал о себе',
    length: 200,
  })
  about: string;
  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  avatar: string;
  @Column({
    unique: true,
  })
  email: string;
  @Column()
  password: string;
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];
  @OneToMany(() => Wish, (wish) => wish.offers)
  offers: Wish[];
  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}
