import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductService } from 'src/Application/product/product.service';
import { CreateProductDto } from 'src/Core/DTO/createProduct.dto';
import { Product } from 'src/Core/Entity/product.entity';
import { multerOptions } from 'src/multer.config';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


@Get("/GetAll")
@ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, example: 5, description: 'Number of items per page (default: 5)' })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number
  ) {
    return this.productService.findAll(page, limit);
  }

  
  @Post('create')
  @ApiOperation({ summary: 'Create a new product' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Product data with image', type: CreateProductDto })
  @UseInterceptors(FileInterceptor('imageUrl', multerOptions)) // Match the field name
  @ApiResponse({ status: 201, description: 'Product created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productService.create(createProductDto, file);
  }


  }