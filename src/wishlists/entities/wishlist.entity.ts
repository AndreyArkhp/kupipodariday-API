import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Wish } from '../../wishes/entities/wish.entity';
import { User } from 'src/users/entities/user.entity';
import {
  wishlistDescriptionLength,
  wishlistNameLength,
} from 'src/common/constants';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({
    length: wishlistNameLength.max,
  })
  name: string;
  @Column({
    length: wishlistDescriptionLength.max,
    default: 'Моя подборка',
  })
  description: string;
  @Column()
  image: string;
  @ManyToMany(() => Wish)
  @JoinTable()
  items: Wish[];
  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;
}
