import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CakesModule } from './cakes/cakes.module';
import { OrdersModule } from './orders/orders.module';
// import { NotificationsModule } from './notifications/notifications.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesService } from './categories/categories.service';
import { CategoriesController } from './categories/categories.controller';
import { CakesController } from './cakes/cakes.controller';
import { OrdersController } from './orders/orders.controller';
import { AuthController } from './auth/auth.controller';
import { CategoriesModule } from './categories/categories.module';
import { CakesService } from './cakes/cakes.service';

@Module({
  imports: [
    UsersModule,
    CakesModule,
    OrdersModule,
    // NotificationsModule,
    AuthModule,
    CategoriesModule,
  ],
  controllers: [
    AppController,
    CategoriesController,
    CakesController,
    OrdersController,
    AuthController,
  ],
  providers: [AppService, CategoriesService, CakesService],
})
export class AppModule {}
