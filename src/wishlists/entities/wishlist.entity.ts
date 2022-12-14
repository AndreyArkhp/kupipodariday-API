import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Length, IsUrl, IsString } from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Wishlist {
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
  @Column({
    length: 1500,
  })
  @Length(0, 1500)
  @IsString()
  description: string;
  @Column()
  @IsUrl()
  image: string;
  @ManyToMany(() => Wish)
  @JoinTable()
  items: Wish[];
  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;
}
