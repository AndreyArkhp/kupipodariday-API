import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Length, IsUrl, IsEmail, IsString } from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column({
    unique: true,
    length: 30,
  })
  @Length(2, 30)
  @IsString()
  username: string;
  @Column({
    default: 'Пока ничего не рассказал о себе',
    length: 200,
  })
  @Length(2, 200)
  @IsString()
  about: string;
  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  @IsUrl()
  avatar: string;
  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;
  @Column()
  @IsString()
  password: string;
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];
  @OneToMany(() => Wish, (wish) => wish.offers)
  offers: Wish[];
  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}
