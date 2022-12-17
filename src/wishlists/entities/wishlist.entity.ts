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

@Entity()
export class Wishlist {
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
  @Column({
    length: 1500,
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
