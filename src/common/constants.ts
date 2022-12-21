import { TypeOrmModuleOptions } from '@nestjs/typeorm';

//PostgreSQL
export const postgresDevData = (entities: any[]) =>
  ({
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'student',
    password: 'student',
    database: 'nest_project',
    entities,
    synchronize: true,
  } as TypeOrmModuleOptions);

//Hashing
export const saltRounds = 10;

//Money
export const lengthNumberOfMoney = 10;
export const roundToHundredths = 2;

//User
export const enum usernameLength {
  min = 2,
  max = 30,
}
export const enum userAboutLength {
  min = 0,
  max = 200,
}
export const userPasswordLengthMin = 2;
export const userAboutDefault = 'Пока ничего не рассказал о себе';
export const userAvatarDefault = 'https://i.pravatar.cc/300';

//Wish
export const enum wishNameLength {
  min = 1,
  max = 250,
}
export const enum wishDescriptionLength {
  min = 1,
  max = 1024,
}

//Wishlist
export const enum wishlistNameLength {
  min = 1,
  max = 250,
}

export const enum wishlistDescriptionLength {
  min,
  max = 1500,
}
