import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../../configuration';
import { UsersModule } from '../users/users.module';
import { OffersModule } from '../offers/offers.module';
import { WishesModule } from '../wishes/wishes.module';
import { WishlistsModule } from '../wishlists/wishlists.module';
import { User } from '../users/entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';
import { Offer } from '../offers/entities/offer.entity';
import { Wishlist } from '../wishlists/entities/wishlist.entity';
import { postgresDevData } from '../common/constants';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    WishesModule,
    OffersModule,
    WishlistsModule,
    AuthModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        ...config.get('database'),
        entities: [User, Wish, Wishlist, Offer],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      load: [configuration],
    }),
  ],
})
export class AppModule {}
