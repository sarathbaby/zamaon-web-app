import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateProductDto } from '../dto/createProduct.dto';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
  constructor(
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

  @ApiTags('product')
  //@ApiBody({ type: Customer.class })
  @ApiOkResponse({
    description: 'Create new product',
  })
  @ApiNotFoundResponse({ description: 'Create new product failed' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post()
  create(@Body() CreateProductDto: CreateProductDto) {
    return this.productService.createProduct(CreateProductDto);
  }

  @ApiTags('product')
  //@ApiBody({ type: Customer.class })
  @ApiOkResponse({
    description: 'Get all Products',
  })
  @ApiNotFoundResponse({ description: 'Get all Products failed' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get('all')
  getAll() {
    return this.productService.findAll();
  }

  @ApiTags('product')
  //@ApiBody({ type: Customer.class })
  @ApiOkResponse({
    description: 'Get single Product by Id',
  })
  @ApiNotFoundResponse({ description: 'Get single Product failed' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get(':id')
  fetchProductById(@Param('id') prodId: number) {
    return this.productService.findProductById(prodId);
  }
}
