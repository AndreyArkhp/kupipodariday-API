import {
  userAboutDefault,
  userAboutLength,
  userAvatarDefault,
  usernameLength,
} from '../../common/constants';
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
    length: usernameLength.max,
  })
  username: string;
  @Column({
    length: userAboutLength.max,
  })
  about: string;
  @Column({
    default: userAvatarDefault,
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
