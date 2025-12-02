import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CakesModule } from './cakes/cakes.module';
import { OrdersModule } from './orders/orders.module';
// import { NotificationsModule } from './notifications/notifications.module';
import { AuthModule } from './auth/auth.module';
// import { CategoriesService } from './categories/categories.service';
// import { CategoriesController } from './categories/categories.controller';
// import { CakesController } from './cakes/cakes.controller';
// import { OrdersController } from './orders/orders.controller';
// import { AuthController } from './auth/auth.controller';
import { CategoriesModule } from './categories/categories.module';
// import { CakesService } from './cakes/cakes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
// import { UsersService } from './users/users.service';

@Module({
  imports: [
    UsersModule,
    CakesModule,
    OrdersModule,
    // NotificationsModule,
    AuthModule,
    CategoriesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'cake_shop',
      entities: [User],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
  ],
  controllers: [
    AppController,
    // CategoriesController,
    // CakesController,
    // OrdersController,
    // AuthController,
    // UsersModule,
  ],
  providers: [AppService],
})
export class AppModule {}
