import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './Application/product/product.module';
import { DatabaseAccess } from './databaseAccess/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
     DatabaseAccess,
    //  UsersModule,
    ProductModule,
     
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
