import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/Core/Entity/product.entity';
import { ProductService } from './product.service';
import { ProductController } from 'src/EndPoint/product/product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),JwtModule.register({}),],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}